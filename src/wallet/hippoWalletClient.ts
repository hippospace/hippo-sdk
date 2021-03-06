import { AptosParserRepo, getTypeTagFullname, parseTypeTagOrThrow, StructTag, u64 } from "@manahippo/move-to-ts";
import { AptosClient, HexString } from "aptos";
import { NetworkConfiguration } from "../config";
import { coin_registry$_ } from "../generated/coin_registry";
import { mock_coin$_ } from "../generated/hippo_swap";
import * as AptosFramework from "../generated/aptos_framework";
import { typeInfoToTypeTag } from "../utils";

export async function getCoinStoresForAddress(client: AptosClient, address: HexString, repo: AptosParserRepo) {
  const walletResources = await client.getAccountResources(address);
  const stores: AptosFramework.coin$_.CoinStore[] = [];
  for(const resource of walletResources) {
    try{
      const typeTag = parseTypeTagOrThrow(resource.type);
      if(!(typeTag instanceof StructTag)) {
        continue;
      }
      // we only looking for 0x1::Coin::CoinStore
      if(
        typeTag.address.hex() !== AptosFramework.coin$_.moduleAddress.hex() ||
        typeTag.module !== AptosFramework.coin$_.moduleName ||
        typeTag.name !== AptosFramework.coin$_.CoinStore.structName
      ) {
        continue;
      }
      const store = repo.parse(resource.data, typeTag) as unknown as AptosFramework.coin$_.CoinStore;
      stores.push(store);
    }
    catch(e) {
      console.warn(`Failed to parse resource of type: ${resource.type}`);
      continue;
    }
  }
  return stores;
}


export class HippoWalletClient {
  public symbolToCoinStore: Record<string, AptosFramework.coin$_.CoinStore>;
  public fullnameToCoinStore: Record<string, AptosFramework.coin$_.CoinStore>;
  public fullnameToTokenInfo: Record<string, coin_registry$_.TokenInfo>;
  public symbolToTokenInfo: Record<string, coin_registry$_.TokenInfo>;
  public mockCoinSymbols: string[];
  constructor(
    public netConf: NetworkConfiguration,
    public aptosClient: AptosClient,
    public repo: AptosParserRepo,
    public registry: coin_registry$_.TokenRegistry,
    public walletAddress: HexString,
    public coinStores: AptosFramework.coin$_.CoinStore[],
  ) {
    this.symbolToCoinStore = {};
    this.fullnameToCoinStore = {};
    this.fullnameToTokenInfo = {};
    this.symbolToTokenInfo = {};
    this.mockCoinSymbols = [];
    this.buildCache();
  }

  buildCache() {
    this.symbolToCoinStore = {};
    this.fullnameToCoinStore = {};
    this.fullnameToTokenInfo = {};
    this.symbolToTokenInfo = {};
    this.mockCoinSymbols = [];
    for(const tokenInfo of this.registry.token_info_list) {
      const typeTag = typeInfoToTypeTag(tokenInfo.token_type);
      const fullname = getTypeTagFullname(typeTag);
      this.fullnameToTokenInfo[fullname] = tokenInfo;
      this.symbolToTokenInfo[tokenInfo.symbol.str()] = tokenInfo;
      if(!(typeTag instanceof StructTag)) {
        throw new Error();
      }
      if(
        typeTag.address.hex() === mock_coin$_.moduleAddress.hex() &&
        typeTag.module === mock_coin$_.moduleName
      ) {
        this.mockCoinSymbols.push(tokenInfo.symbol.str());
      }
    }
    for(const store of this.coinStores) {
      if(!(store.typeTag instanceof StructTag)) {
        throw new Error();
      }
      const typeTag = store.typeTag.typeParams[0];
      if(!typeTag) {
        throw new Error();
      }
      const fullname = getTypeTagFullname(typeTag);
      this.fullnameToCoinStore[fullname] = store;
      const tokenInfo = this.fullnameToTokenInfo[fullname];
      if(!tokenInfo) {
        // token not part of our registry
        continue;
      }
      this.symbolToCoinStore[tokenInfo.symbol.str()] = store;
    }
  }

  async refreshStores() {
    this.coinStores = await getCoinStoresForAddress(this.aptosClient, this.walletAddress, this.repo);
    this.buildCache();
  }

  static async createInTwoCalls(
    netConf: NetworkConfiguration, 
    aptosClient: AptosClient, 
    repo: AptosParserRepo, 
    walletAddress: HexString
  ) {
    const registry = await coin_registry$_.TokenRegistry.load(repo, aptosClient, netConf.contractAddress, []);
    const stores = await getCoinStoresForAddress(aptosClient, walletAddress, repo);
    return new HippoWalletClient(netConf, aptosClient, repo, registry, walletAddress, stores);
  }

  makeFaucetMintToPayload(uiAmount: number, symbol: string) {
    if(!this.mockCoinSymbols.includes(symbol)) {
      throw new Error(`${symbol} is not a MockCoin and we are unable to mint it.`);
    }
    const tokenInfo = this.symbolToTokenInfo[symbol];
    if(!tokenInfo) {
      throw new Error(`Cannot find TokenInfo for ${symbol}`);
    }
    const rawAmount = u64(Math.floor(uiAmount * Math.pow(10, tokenInfo.decimals.toJsNumber())))
    const tokenTypeTag = typeInfoToTypeTag(tokenInfo.token_type);
    return mock_coin$_.buildPayload_faucet_mint_to_script(rawAmount, [tokenTypeTag])
  }

  debugPrint() {
    for(const symbol in this.symbolToCoinStore) {
      const store = this.symbolToCoinStore[symbol];
      const tokenInfo = this.symbolToTokenInfo[symbol];
      console.log(`${tokenInfo.symbol.str()}: ${store.coin.value.toJsNumber() / Math.pow(10, tokenInfo.decimals.toJsNumber())}`);
    }
  }
}