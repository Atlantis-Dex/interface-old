import React from "react";
import { BigNumber, ethers } from "ethers";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Token } from "@uniswap/sdk";
import { ITokenData } from "../../interfaces/TokenData";
import { useAppSelector } from "../../hooks";

interface Props {
  token: ITokenData | null;
  setToken(token: ITokenData | null): void;
  placeholder?: string;
}

export default function TokenAmountInput(props: Props): JSX.Element {
  const { token, setToken, placeholder } = props;

  // TODO: Move to a token list
  const tokens = useAppSelector(state => state.account.tokens);

  const balance = token?.balance;
  let displayVal = "0";
  if (balance) {
    displayVal = ethers.utils.formatEther(balance);
  }
  console.log(displayVal);

  return (
    <>
      <div className="token-amount form-group">
        <div className="controls">
          <div className="input-group">
            <input
              type="text"
              id={"inputAmount"}
              placeholder={placeholder || "0"}
              onChange={event => {
                setToken({
                  ...token,
                  ...{
                    amount: event.target.value.length ? BigNumber.from(event.target.value) : undefined,
                  },
                });
              }}
              className="form-control"
            />
            <DropdownButton title={token?.token?.symbol || "Select"} variant={"light"}>
              {tokens &&
                Array.from(tokens.values()).map((tokenItem: ITokenData, index: number) => (
                  <Dropdown.Item
                    key={index}
                    onClick={event => {
                      event.currentTarget.blur();
                      event.preventDefault();

                      setToken({
                        ...token,
                        ...{
                          token: tokenItem.token,
                        },
                      });
                    }}
                  >
                    {tokenItem && tokenItem.token && tokenItem.token.symbol}
                  </Dropdown.Item>
                ))}
            </DropdownButton>
          </div>
          {token?.balance && (
            <p className="max-input text-end small">
              <span
                onClick={event => ({
                  ...token,
                  ...{
                    amount: token?.balance,
                  },
                })}
              >
                Max: {displayVal} {token.token?.symbol || ""}
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
