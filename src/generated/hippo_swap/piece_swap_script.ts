import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as aptos_framework$_ from "../aptos_framework";
import * as coin_registry$_ from "../coin_registry";
import * as std$_ from "../std";
import * as math$_ from "./math";
import * as mock_coin$_ from "./mock_coin";
import * as mock_deploy$_ from "./mock_deploy";
import * as piece_swap$_ from "./piece_swap";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "piece_swap_script";

export const E_LP_TOKEN_ALREADY_REGISTERED : U64 = u64("7");
export const E_OUTPUT_LESS_THAN_MIN : U64 = u64("3");
export const E_SWAP_NONZERO_INPUT_REQUIRED : U64 = u64("2");
export const E_SWAP_ONLY_ONE_IN_ALLOWED : U64 = u64("0");
export const E_SWAP_ONLY_ONE_OUT_ALLOWED : U64 = u64("1");
export const E_TOKEN_REGISTRY_NOT_INITIALIZED : U64 = u64("4");
export const E_TOKEN_X_NOT_REGISTERED : U64 = u64("5");
export const E_TOKEN_Y_NOT_REGISTERED : U64 = u64("6");

export function add_liquidity_script$ (
  sender: HexString,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  piece_swap$_.add_liquidity$(sender, $.copy(amount_x), $.copy(amount_y), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}


export function buildPayload_add_liquidity_script (
  amount_x: U64,
  amount_y: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap_script::add_liquidity_script",
    typeParamStrings,
    [
      $.payloadArg(amount_x),
      $.payloadArg(amount_y),
    ]
  );

}

export function create_new_pool$ (
  admin: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_description: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  k: U128,
  w1_numerator: U128,
  w1_denominator: U128,
  w2_numerator: U128,
  w2_denominator: U128,
  swap_fee_per_million: U64,
  protocol_fee_share_per_thousand: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let admin_addr, decimals, decimals__1;
  admin_addr = std$_.signer$_.address_of$(admin, $c);
  if (!coin_registry$_.coin_registry$_.is_registry_initialized$($.copy(admin_addr), $c)) {
    throw $.abortCode(E_TOKEN_REGISTRY_NOT_INITIALIZED);
  }
  if (!coin_registry$_.coin_registry$_.has_token$($.copy(admin_addr), $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(E_TOKEN_X_NOT_REGISTERED);
  }
  if (!coin_registry$_.coin_registry$_.has_token$($.copy(admin_addr), $c, [$p[1]] as TypeTag[])) {
    throw $.abortCode(E_TOKEN_Y_NOT_REGISTERED);
  }
  if (!!coin_registry$_.coin_registry$_.has_token$($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  if (!!coin_registry$_.coin_registry$_.has_token$($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[1], $p[0]])] as TypeTag[])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  decimals = math$_.max$(u128(aptos_framework$_.coin$_.decimals$($c, [$p[0]] as TypeTag[])), u128(aptos_framework$_.coin$_.decimals$($c, [$p[1]] as TypeTag[])), $c);
  decimals__1 = u64($.copy(decimals));
  piece_swap$_.create_new_pool$(admin, $.copy(lp_name), $.copy(lp_symbol), $.copy(decimals__1), $.copy(k), $.copy(w1_numerator), $.copy(w1_denominator), $.copy(w2_numerator), $.copy(w2_denominator), $.copy(swap_fee_per_million), $.copy(protocol_fee_share_per_thousand), $c, [$p[0], $p[1]] as TypeTag[]);
  coin_registry$_.coin_registry$_.add_token$(admin, $.copy(lp_name), $.copy(lp_symbol), $.copy(lp_description), u8($.copy(decimals__1)), $.copy(lp_logo_url), $.copy(lp_project_url), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function create_new_pool_script$ (
  admin: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  k: U128,
  w1_numerator: U128,
  w1_denominator: U128,
  w2_numerator: U128,
  w2_denominator: U128,
  swap_fee_per_million: U64,
  protocol_fee_share_per_thousand: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  return create_new_pool$(admin, $.copy(lp_name), $.copy(lp_symbol), [], [], [], $.copy(k), $.copy(w1_numerator), $.copy(w1_denominator), $.copy(w2_numerator), $.copy(w2_denominator), $.copy(swap_fee_per_million), $.copy(protocol_fee_share_per_thousand), $c, [$p[0], $p[1]] as TypeTag[]);
}


export function buildPayload_create_new_pool_script (
  lp_name: U8[],
  lp_symbol: U8[],
  k: U128,
  w1_numerator: U128,
  w1_denominator: U128,
  w2_numerator: U128,
  w2_denominator: U128,
  swap_fee_per_million: U64,
  protocol_fee_share_per_thousand: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap_script::create_new_pool_script",
    typeParamStrings,
    [
      $.u8ArrayArg(lp_name),
      $.u8ArrayArg(lp_symbol),
      $.payloadArg(k),
      $.payloadArg(w1_numerator),
      $.payloadArg(w1_denominator),
      $.payloadArg(w2_numerator),
      $.payloadArg(w2_denominator),
      $.payloadArg(swap_fee_per_million),
      $.payloadArg(protocol_fee_share_per_thousand),
    ]
  );

}

export function mock_deploy_script$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, billion, initial_amount;
  admin_addr = std$_.signer$_.address_of$(admin, $c);
  if (!coin_registry$_.coin_registry$_.is_registry_initialized$($.copy(admin_addr), $c)) {
    coin_registry$_.coin_registry$_.initialize$(admin, $c);
  }
  else{
  }
  mock_deploy$_.init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("67")], [u8("85"), u8("83"), u8("68"), u8("67")], u64("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])] as TypeTag[]);
  mock_deploy$_.init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("84")], [u8("85"), u8("83"), u8("68"), u8("84")], u64("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", [])] as TypeTag[]);
  mock_deploy$_.init_coin_and_create_store$(admin, [u8("68"), u8("65"), u8("73")], [u8("68"), u8("65"), u8("73")], u64("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WDAI", [])] as TypeTag[]);
  billion = u128("1000000000");
  create_new_pool_script$(admin, [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("32"), u8("76"), u8("80"), u8("32"), u8("84"), u8("111"), u8("107"), u8("101"), u8("110")], [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("80"), u8("83"), u8("95"), u8("76"), u8("80")], $.copy(billion).mul($.copy(billion)), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])] as TypeTag[]);
  create_new_pool_script$(admin, [u8("68"), u8("65"), u8("73"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("32"), u8("76"), u8("80"), u8("32"), u8("84"), u8("111"), u8("107"), u8("101"), u8("110")], [u8("68"), u8("65"), u8("73"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("80"), u8("83"), u8("95"), u8("76"), u8("80")], $.copy(billion).mul($.copy(billion)), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WDAI", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])] as TypeTag[]);
  initial_amount = u64("1000000").mul(u64("100000000"));
  mock_coin$_.faucet_mint_to$(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", [])] as TypeTag[]);
  mock_coin$_.faucet_mint_to$(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])] as TypeTag[]);
  add_liquidity_script$(admin, $.copy(initial_amount), $.copy(initial_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])] as TypeTag[]);
  mock_coin$_.faucet_mint_to$(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WDAI", [])] as TypeTag[]);
  mock_coin$_.faucet_mint_to$(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])] as TypeTag[]);
  add_liquidity_script$(admin, $.copy(initial_amount), $.copy(initial_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WDAI", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])] as TypeTag[]);
  return;
}


export function buildPayload_mock_deploy_script (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap_script::mock_deploy_script",
    typeParamStrings,
    []
  );

}

export function remove_liquidity_script$ (
  sender: HexString,
  liquidity: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  piece_swap$_.remove_liquidity$(sender, $.copy(liquidity), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}


export function buildPayload_remove_liquidity_script (
  liquidity: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap_script::remove_liquidity_script",
    typeParamStrings,
    [
      $.payloadArg(liquidity),
    ]
  );

}

export function swap_script$ (
  sender: HexString,
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1, temp$2, x_out, y_out;
  if ($.copy(x_in).gt(u64("0"))) {
    temp$1 = $.copy(y_in).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (!!temp$1) {
    throw $.abortCode(E_SWAP_ONLY_ONE_IN_ALLOWED);
  }
  if ($.copy(x_min_out).gt(u64("0"))) {
    temp$2 = $.copy(y_min_out).gt(u64("0"));
  }
  else{
    temp$2 = false;
  }
  if (!!temp$2) {
    throw $.abortCode(E_SWAP_ONLY_ONE_OUT_ALLOWED);
  }
  if ($.copy(x_in).gt(u64("0"))) {
    y_out = piece_swap$_.swap_x_to_y$(sender, $.copy(x_in), $c, [$p[0], $p[1]] as TypeTag[]);
    if (!$.copy(y_out).ge($.copy(y_min_out))) {
      throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
    }
  }
  else{
    if ($.copy(y_in).gt(u64("0"))) {
      x_out = piece_swap$_.swap_y_to_x$(sender, $.copy(y_in), $c, [$p[0], $p[1]] as TypeTag[]);
      if (!$.copy(x_out).ge($.copy(x_min_out))) {
        throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
      }
    }
    else{
      if (!false) {
        throw $.abortCode(E_SWAP_NONZERO_INPUT_REQUIRED);
      }
    }
  }
  return;
}


export function buildPayload_swap_script (
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap_script::swap_script",
    typeParamStrings,
    [
      $.payloadArg(x_in),
      $.payloadArg(y_in),
      $.payloadArg(x_min_out),
      $.payloadArg(y_min_out),
    ]
  );

}

export function loadParsers(repo: AptosParserRepo) {
}

