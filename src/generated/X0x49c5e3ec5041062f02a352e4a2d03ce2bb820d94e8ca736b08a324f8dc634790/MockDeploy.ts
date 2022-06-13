import { HexString } from "aptos";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";
import { String } from '../X0x1/ASCII';

export const moduleAddress = new HexString("0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790");
export const moduleName = "MockDeploy";


export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::ASCII::String", String.StringParser);
}
