import React from "react";
import { TokenData } from "../../interfaces/TokenData";
import { BigNumber, ethers } from "ethers";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Token } from "@uniswap/sdk";
import TOKENS from "../../data/tokens";

interface Props {
  token: TokenData | null
  setToken(token: TokenData | null): void
  placeholder?: string
}

export default function TokenAmountInput(props: Props): JSX.Element {

  const { token, setToken, placeholder } = props;

  // TODO: Move to a token list
  const tokens = TOKENS;

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
          <div
            className="input-group"
          >
            <input
              type="text"
              id={"inputAmount"}
              placeholder={placeholder || "0"}
              onChange={(event) => {
                setToken({
                  ...token,
                  ...{
                    amount: event.target.value.length ? BigNumber.from(event.target.value) : undefined,
                  }
                });
              }}
              className="form-control"
            />
            <DropdownButton
              title={(token?.token?.symbol || "Select")}
              variant={"light"}
            >
              {tokens.map((tokenItem: Token, index: number) => (
                <Dropdown.Item
                  key={index}
                  onClick={(event) => {
                    event.currentTarget.blur();
                    event.preventDefault();

                    setToken({
                      ...token,
                      ...{
                        token: tokenItem
                      }
                    });
                  }}
                >{tokenItem.symbol}</Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
          {token?.balance && (
            <p className="max-input text-end small">
              <span
				  onClick={(event) => ({
					  ...token,
					  ...{
						  amount: token?.balance
					  }
				  })}
              >Max: {displayVal} {token.token?.symbol || ""}</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
