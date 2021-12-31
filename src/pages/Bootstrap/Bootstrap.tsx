import React, { useEffect, useState } from "react";
import { BigNumber, utils } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import TokenAmountInput from "../../components/TokenAmountInput/TokenAmountInput";
import { ITokenData } from "../../interfaces/TokenData";
import { useAppSelector } from "../../hooks";
import { tokenName_gohm } from "../../contracts";

export default function Bootstrap(): JSX.Element {
  // states
  const [inputToken, setInputToken] = useState<ITokenData | null>(null);
  const [amount, setAmount] = useState<BigNumber>(BigNumber.from(0));
  const [showSwapSettingsModal, setShowSwapSettingsModal] = useState<boolean>(false);
  const tokens = useAppSelector(state => state.account.tokens);

  // on Load
  useEffect(() => {
    // Set initial selected token
    if (!tokens) return;
    if (tokens.size == 0) return;
    const gohm = tokens.get(tokenName_gohm);
    if (!gohm) return;

    setInputToken(gohm);
  }, []);

  const approve = async () => {
    toast("Please confirm transaction");
    console.log("...");
  };

  const swap = async () => {
    toast("Please confirm transaction");
    console.log("...");
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card swap-card mt-3">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-6">Bootstrap Liquidity</div>
                <div className="col-lg-6 text-end">
                  <button
                    type={"button"}
                    onClick={event => {
                      event.currentTarget.blur();
                    }}
                    className="btn btn-transparent btn-sm"
                  >
                    <FontAwesomeIcon icon={"cog"} />
                  </button>
                </div>
              </div>
            </div>
            <div className="list-group list-group-flush">
              <div className="list-group-item py-3">
                <TokenAmountInput token={inputToken} setToken={setInputToken} setAmount={setAmount} amount={amount} />
              </div>
              <div className="list-group-item small">
                <div className="row">
                  <div className="col-md-6">Est. APY</div>
                  <div className="col-md-6 text-end">6,420 %</div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-lg-6">
                  <button
                    disabled={(inputToken?.allowance || 0) != 0 && inputToken?.allowance?.gte(amount)}
                    onClick={event => {
                      event.currentTarget.blur();

                      console.log("approve...");

                      approve();
                    }}
                    className={"btn btn-success btn-block"}
                  >
                    Approve
                  </button>
                </div>
                <div className="col-lg-6">
                  <button
                    disabled={
                      (inputToken?.allowance || 0) === 0 || (inputToken?.allowance && inputToken?.allowance.lt(amount))
                    }
                    onClick={event => {
                      event.currentTarget.blur();

                      swap();
                    }}
                    className="btn btn-success btn-block"
                  >
                    Swap
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showSwapSettingsModal} onHide={() => setShowSwapSettingsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
        <Modal.Footer>
          <button type={"button"} onClick={() => setShowSwapSettingsModal(false)} className={"btn btn-secondary"}>
            Close
          </button>
          <button type={"button"} onClick={() => setShowSwapSettingsModal(false)} className={"btn btn-primary"}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
