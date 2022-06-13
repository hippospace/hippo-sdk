import { AptosParserRepo } from "@manahippo/aptos-tsgen";
import * as X0x1_ASCII from "./X0x1/ASCII";
import * as X0x1_Account from "./X0x1/Account";
import * as X0x1_BCS from "./X0x1/BCS";
import * as X0x1_Block from "./X0x1/Block";
import * as X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_CPScripts from "./X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/CPScripts";
import * as X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_CPSwap from "./X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/CPSwap";
import * as X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_CPSwapUtils from "./X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/CPSwapUtils";
import * as X0x1_ChainId from "./X0x1/ChainId";
import * as X0x1_Coin from "./X0x1/Coin";
import * as X0x1_ConsensusConfig from "./X0x1/ConsensusConfig";
import * as X0x1_Errors from "./X0x1/Errors";
import * as X0x1_Event from "./X0x1/Event";
import * as X0x1_GUID from "./X0x1/GUID";
import * as X0x1_Genesis from "./X0x1/Genesis";
import * as X0x1_Hash from "./X0x1/Hash";
import * as X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_HippoConfig from "./X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/HippoConfig";
import * as X0x1_IterableTable from "./X0x1/IterableTable";
import * as X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_Math from "./X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/Math";
import * as X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_MockCoin from "./X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/MockCoin";
import * as X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_MockDeploy from "./X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/MockDeploy";
import * as X0x1_Option from "./X0x1/Option";
import * as X0x1_Reconfiguration from "./X0x1/Reconfiguration";
import * as X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_SafeMath from "./X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/SafeMath";
import * as X0x1_Signer from "./X0x1/Signer";
import * as X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_StableCurveNumeral from "./X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/StableCurveNumeral";
import * as X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_StableCurveScripts from "./X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/StableCurveScripts";
import * as X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_StableCurveSwap from "./X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/StableCurveSwap";
import * as X0x1_Stake from "./X0x1/Stake";
import * as X0x1_SystemAddresses from "./X0x1/SystemAddresses";
import * as X0x1_Table from "./X0x1/Table";
import * as X0x1_TestCoin from "./X0x1/TestCoin";
import * as X0x1_Timestamp from "./X0x1/Timestamp";
import * as X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_TokenRegistry from "./X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/TokenRegistry";
import * as X0x1_TransactionFee from "./X0x1/TransactionFee";
import * as X0x1_TransactionPublishingOption from "./X0x1/TransactionPublishingOption";
import * as X0x1_TypeInfo from "./X0x1/TypeInfo";
import * as X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_Utils from "./X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/Utils";
import * as X0x1_VMConfig from "./X0x1/VMConfig";
import * as X0x1_Vector from "./X0x1/Vector";
import * as X0x1_Version from "./X0x1/Version";
export function getParserRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  X0x1_ASCII.loadParsers(repo);
  X0x1_Account.loadParsers(repo);
  X0x1_BCS.loadParsers(repo);
  X0x1_Block.loadParsers(repo);
  X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_CPScripts.loadParsers(repo);
  X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_CPSwap.loadParsers(repo);
  X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_CPSwapUtils.loadParsers(repo);
  X0x1_ChainId.loadParsers(repo);
  X0x1_Coin.loadParsers(repo);
  X0x1_ConsensusConfig.loadParsers(repo);
  X0x1_Errors.loadParsers(repo);
  X0x1_Event.loadParsers(repo);
  X0x1_GUID.loadParsers(repo);
  X0x1_Genesis.loadParsers(repo);
  X0x1_Hash.loadParsers(repo);
  X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_HippoConfig.loadParsers(repo);
  X0x1_IterableTable.loadParsers(repo);
  X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_Math.loadParsers(repo);
  X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_MockCoin.loadParsers(repo);
  X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_MockDeploy.loadParsers(repo);
  X0x1_Option.loadParsers(repo);
  X0x1_Reconfiguration.loadParsers(repo);
  X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_SafeMath.loadParsers(repo);
  X0x1_Signer.loadParsers(repo);
  X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_StableCurveNumeral.loadParsers(repo);
  X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_StableCurveScripts.loadParsers(repo);
  X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_StableCurveSwap.loadParsers(repo);
  X0x1_Stake.loadParsers(repo);
  X0x1_SystemAddresses.loadParsers(repo);
  X0x1_Table.loadParsers(repo);
  X0x1_TestCoin.loadParsers(repo);
  X0x1_Timestamp.loadParsers(repo);
  X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_TokenRegistry.loadParsers(repo);
  X0x1_TransactionFee.loadParsers(repo);
  X0x1_TransactionPublishingOption.loadParsers(repo);
  X0x1_TypeInfo.loadParsers(repo);
  X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790_Utils.loadParsers(repo);
  X0x1_VMConfig.loadParsers(repo);
  X0x1_Vector.loadParsers(repo);
  X0x1_Version.loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}