import React from "react";
import { BigNumber, ethers } from "ethers";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ITokenData } from "../../interfaces/TokenData";
import { useAppSelector } from "../../hooks";

interface Props {
  token: ITokenData | null;
  setToken(token: ITokenData | null): void;
  amount: BigNumber;
  setAmount(amount: BigNumber): void; // temporary state for value
  placeholder?: string;
}

export default function TokenAmountInput(props: Props): JSX.Element {
  // State
  const { token, setToken, amount, setAmount, placeholder } = props;
  const tokens = useAppSelector(state => state.account.tokens);

  // State Mutators
  const _setAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.length) return;

    let bigNumberAmount = ethers.utils.parseEther(event.target.value);
    if (bigNumberAmount.lte(0)) {
      bigNumberAmount = BigNumber.from(0);
    }
    setAmount(bigNumberAmount);
  };

  const _setMax = () => {
    if (!token) return;
    if (!token.balance) return;
    setAmount(token.balance);
  };

  const _setToken = (newToken: ITokenData) => {
    return function (event: React.MouseEvent<HTMLElement, MouseEvent>) {
      event.currentTarget.blur();
      event.preventDefault();

      setToken(newToken);
    };
  };

  const balance = token?.balance;
  let displayBalance = "0";
  if (balance) {
    displayBalance = ethers.utils.formatEther(balance).substring(0, 5);
  }

  const displayAmount = ethers.utils.formatEther(amount);

  return (
    <>
      <div className="token-amount form-group">
        <div className="controls">
          <div className="input-group">
            <input
              type="number"
              id={"inputAmount"}
              placeholder={placeholder || "0"}
              onChange={_setAmount}
              className="form-control"
              value={displayAmount}
            />
            <DropdownButton title={token?.symbol || "Select"} variant={"light"}>
              {!tokens && <Dropdown.Header>Connect your wallet</Dropdown.Header>}
              {tokens &&
                Array.from(tokens.values()).map((tokenItem: ITokenData, index: number) => (
                  <Dropdown.Item key={index} onClick={_setToken(tokenItem)}>
                    {tokenItem && tokenItem.symbol}
                  </Dropdown.Item>
                ))}
            </DropdownButton>
          </div>
          {token?.balance && (
            <p className="max-input text-end small">
              <span onClick={_setMax}>
                Max: {displayBalance} {token?.symbol || ""}
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
