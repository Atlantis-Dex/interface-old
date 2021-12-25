import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import TokenAmountInput from "../../components/TokenAmountInput/TokenAmountInput";
import { ITokenData } from "../../interfaces/TokenData";

import "./styles.scss";
import { toast } from "react-toastify";

export default function Swap(): JSX.Element {
  const { account } = useWeb3React();

  // states
  const [inputToken, setInputToken] = useState<ITokenData | null>(null);
  const [outputToken, setOutputToken] = useState<ITokenData | null>(null);

  // swap settings
  const [showSwapSettingsModal, setShowSwapSettingsModal] = useState<boolean>(false);
  const [slippage, setSlippage] = useState<number>(0.005);

  // TODO: Move to a token list
  const tokens = [];

  useEffect(() => {
    if (account && inputToken?.token?.address) {
      // TODO: set balance and allowance
      console.log("set balance and allowance of inputToken");
    }
  }, [account, inputToken?.token?.address]);

  useEffect(() => {
    if (account && outputToken?.token?.address) {
      // TODO: set balance and allowance
      console.log("set balance and allowance of outputToken");
    }
  }, [account, outputToken?.token?.address]);

  useEffect(() => {
    if (inputToken?.token?.address == outputToken?.token?.address) {
      reverse();
    }
  }, [inputToken?.token?.address, outputToken?.token?.address]);

  const reverse = () => {
    const prevInput = inputToken;

    setInputToken(outputToken);
    setOutputToken(prevInput);
  };

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
        <div className="col-12 col-md-8 col-lg-6 col-xl-4">
          <div className="card swap-card mt-3">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-6">Swap</div>
                <div className="col-lg-6 text-end">
                  <button
                    type={"button"}
                    onClick={event => {
                      event.currentTarget.blur();
                      setShowSwapSettingsModal(true);
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
                <TokenAmountInput
                  token={inputToken}
                  setToken={(newToken: ITokenData | null) => {
                    if (newToken?.token?.address === outputToken?.token?.address) {
                      reverse();
                    } else {
                      setInputToken(newToken);
                    }
                  }}
                />
                <div className="text-center">
                  <button
                    type={"button"}
                    onClick={event => {
                      event.currentTarget.blur();

                      reverse();
                    }}
                    className="btn btn-light bg-transparent border-0"
                  >
                    <FontAwesomeIcon icon={"arrows-alt-v"} />
                  </button>
                </div>
                <TokenAmountInput
                  token={outputToken}
                  setToken={(newToken: ITokenData | null) => {
                    if (newToken?.token?.address === inputToken?.token?.address) {
                      reverse();
                    } else {
                      setOutputToken(newToken);
                    }
                  }}
                />
              </div>
              <div className="list-group-item small">
                <div className="row">
                  <div className="col-md-6">Slippage Fee</div>
                  <div className="col-md-6 text-end">{slippage * 100} %</div>
                </div>
                <div className="row">
                  <div className="col-md-6">Min. you receive</div>
                  <div className="col-md-6 text-end">100,000</div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-lg-6">
                  <button
                    disabled={(inputToken?.allowance || 0) != 0 && inputToken?.allowance?.gte(inputToken?.amount || 0)}
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
                      (inputToken?.allowance || 0) === 0 ||
                      (inputToken?.allowance && inputToken?.allowance.lt(inputToken?.amount || 0))
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
          <div className="card mt-5">
            <div className="card-body">
              <p className="fw-bold">Swap details:</p>
              <p>Input token: {inputToken?.token?.address}</p>
              <p>Output token: {outputToken?.token?.address}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showSwapSettingsModal} onHide={() => setShowSwapSettingsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="slippage">Slippage</label>
            <div className="controls">
              <div className="input-group mb-3">
                <button
                  type="button"
                  onClick={() => setSlippage(0.005)}
                  className={"btn " + (slippage === 0.005 ? "btn-secondary" : "btn-outline-secondary")}
                >
                  .5 %
                </button>
                <button
                  type="button"
                  onClick={() => setSlippage(0.01)}
                  className={"btn " + (slippage === 0.01 ? "btn-secondary" : "btn-outline-secondary")}
                >
                  1 %
                </button>
                <button
                  type="button"
                  onClick={() => setSlippage(0.02)}
                  className={"btn " + (slippage === 0.02 ? "btn-secondary" : "btn-outline-secondary")}
                >
                  2 %
                </button>
                <div className="input-group">
                  <input
                    type="text"
                    value={slippage}
                    onChange={event =>
                      setSlippage(isNaN(Number(event.currentTarget.value)) ? 0.05 : Number(event.currentTarget.value))
                    }
                    className="form-control"
                  />
                  <span className="input-group-text">%</span>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
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
