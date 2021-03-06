import { u64 } from '@manahippo/move-to-ts';
import { TransactionPayload } from 'aptos/dist/api/data-contracts';
import { cp_scripts$_, cp_swap$_ } from '../generated/hippo_swap';
import { TokenInfo } from '../generated/coin_registry/coin_registry';
import {HippoPool, PoolType, PriceType, QuoteType, UITokenAmount} from './baseTypes';

export class HippoConstantProductPool extends HippoPool {
  constructor(
    xTokenInfo: TokenInfo,
    yTokenInfo: TokenInfo,
    lpTokenInfo: TokenInfo,
    public cpPoolMeta: cp_swap$_.TokenPairMetadata,
  ) {
    super(xTokenInfo, yTokenInfo, lpTokenInfo);
  }
  xUiBalance() {
    return this.cpPoolMeta.balance_x.value.toJsNumber() / Math.pow(10, this.xTokenInfo.decimals.toJsNumber());
  }
  yUiBalance() {
    return this.cpPoolMeta.balance_y .value.toJsNumber() / Math.pow(10, this.yTokenInfo.decimals.toJsNumber());
  }
  getId(): string {
    return `HippoConstantProductPool<${this.xyFullname()}>`;
  }
  getAfterFeeFactor() : number {
    return 0.997;
  }
  getCurrentPriceDirectional(isXtoY: boolean): PriceType {
    const xUiBalance = isXtoY ? this.xUiBalance() : this.yUiBalance();
    const yUiBalance = isXtoY ? this.yUiBalance() : this.xUiBalance();
    return {
      xToY: xUiBalance / yUiBalance / this.getAfterFeeFactor(), 
      yToX: yUiBalance / xUiBalance / this.getAfterFeeFactor()
    };
  }
  getQuoteDirectional(inputUiAmt: UITokenAmount, isXtoY: boolean) : QuoteType {
    const xUiBalance = this.xUiBalance();
    const yUiBalance = this.yUiBalance();
    const k = xUiBalance * yUiBalance;
    let outputUiAmt, initialPrice, finalPrice;
    let inputSymbol, outputSymbol;
    if (isXtoY) {
      inputSymbol = this.xTokenInfo.symbol.str();
      outputSymbol = this.yTokenInfo.symbol.str();
      // compute output in Y
      const newXUiBalance = xUiBalance + inputUiAmt;
      const newYUiBalance = k / newXUiBalance;
      outputUiAmt = (yUiBalance - newYUiBalance) * this.getAfterFeeFactor();
      initialPrice = yUiBalance / xUiBalance;
      finalPrice = newYUiBalance / newXUiBalance;
    } else {
      inputSymbol = this.yTokenInfo.symbol.str();
      outputSymbol = this.xTokenInfo.symbol.str();
      // compute output in X
      const newYUiBalance = yUiBalance + inputUiAmt;
      const newXUiBalance = k / newYUiBalance;
      outputUiAmt = (xUiBalance - newXUiBalance) * this.getAfterFeeFactor();
      initialPrice = xUiBalance / yUiBalance;
      finalPrice = newXUiBalance / newYUiBalance;
    }
    const avgPrice = outputUiAmt / inputUiAmt;
    const priceImpact = (finalPrice - initialPrice) / initialPrice;

    return {inputSymbol, outputSymbol, inputUiAmt, outputUiAmt, initialPrice, avgPrice, finalPrice, priceImpact};
  }
  estimateWithdrawalOutput(lpUiAmount: UITokenAmount, lpSupplyUiAmt: UITokenAmount): {xUiAmt: UITokenAmount; yUiAmt: UITokenAmount} {
    const fraction = lpUiAmount / lpSupplyUiAmt;
    return {
      xUiAmt: this.xUiBalance() * fraction,
      yUiAmt: this.yUiBalance() * fraction,
    };

  }
  estimateNeededYFromXDeposit(xUiAmt: UITokenAmount): UITokenAmount {
    const fraction = xUiAmt / this.xUiBalance();
    return this.yUiBalance() * fraction;
  }
  estimateNeededXFromYDeposit(yUiAmt: UITokenAmount): UITokenAmount {
    const fraction = yUiAmt / this.yUiBalance();
    return this.xUiBalance() * fraction;
  }
  getPoolType(): PoolType {
    return PoolType.CONSTANT_PRODUCT;
  }

  // transactions
  async makeSwapPayloadDirectional( 
    amountIn: UITokenAmount, 
    minAmountOut: UITokenAmount, 
    isXtoY: boolean
  ): Promise<TransactionPayload> {
    const fromTokenInfo = isXtoY ? this.xTokenInfo : this.yTokenInfo;
    const toTokenInfo = isXtoY ? this.yTokenInfo : this.xTokenInfo;
    const fromRawAmount = u64((amountIn * Math.pow(10, fromTokenInfo.decimals.toJsNumber())).toFixed(0));
    const toRawAmount = u64((minAmountOut * Math.pow(10, toTokenInfo.decimals.toJsNumber())).toFixed(0));
    if(isXtoY) {
      return cp_scripts$_.buildPayload_swap_script(
        fromRawAmount, 
        u64(0), 
        u64(0), 
        toRawAmount, 
        this.lpTag().typeParams
      );
    }
    else {
      return cp_scripts$_.buildPayload_swap_script(
        u64(0), 
        fromRawAmount, 
        toRawAmount, 
        u64(0), 
        this.lpTag().typeParams
      );
    }
  }

  async makeAddLiquidityPayload(xUiAmt: UITokenAmount, yUiAmt: UITokenAmount): Promise<TransactionPayload> {
    const xRawAmt = u64((xUiAmt * Math.pow(10, this.xTokenInfo.decimals.toJsNumber())).toFixed(0));
    const yRawAmt = u64((yUiAmt * Math.pow(10, this.yTokenInfo.decimals.toJsNumber())).toFixed(0));
    return cp_scripts$_.buildPayload_add_liquidity_script(xRawAmt, yRawAmt, this.lpTag().typeParams);
  }

  async makeRemoveLiquidityPayload(
    liqiudityAmt: UITokenAmount, 
    lhsMinAmt: UITokenAmount, 
    rhsMinAmt: UITokenAmount,
  ): Promise<TransactionPayload> {
    const liquidityRawAmt = u64(liqiudityAmt * Math.pow(10, this.lpTokenInfo.decimals.toJsNumber()));
    const lhsMinRawAmt = u64(lhsMinAmt * Math.pow(10, this.xTokenInfo.decimals.toJsNumber()));
    const rhsMinRawAmt = u64(rhsMinAmt * Math.pow(10, this.yTokenInfo.decimals.toJsNumber()));
    return cp_scripts$_.buildPayload_remove_liquidity_script(liquidityRawAmt, lhsMinRawAmt, rhsMinRawAmt, this.lpTag().typeParams);
  }
}