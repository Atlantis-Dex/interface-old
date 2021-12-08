import React from "react";
import { Nav, Navbar as BSNavbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../hooks/useAuth";
import { ConnectorNames } from "../../constants/connectorNames";

export default function Navbar(): JSX.Element {
  const { login, isConnecting } = useAuth();

  const { account } = useWeb3React();

  return (
    <>
      <BSNavbar bg="transparent" expand="lg">
        <div className={"container-fluid"}>
          <Link to={"/"} className={"navbar-brand"}>Atlantis</Link>
          <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BSNavbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to={"/bootstrap"} className={"nav-link"}>Bootstrap</Link>
              <Link to={"/farm"} className={"nav-link"}>Farm</Link>
              <Link to={"/swap"} className={"nav-link"}>Swap</Link>
              <a href={"https://discord.com"} target={"_blank"} className={"nav-link"} rel="noreferrer">Discord</a>
              {account ? (
                <a href={"#"} className={"nav-link btn btn-dark text-white"}>
                  {account.slice(0,5)+"..."+account.slice(-3)}
                </a>
              ) : (
                <a
                  href={"#"}
                  onClick={event => {
                    event.preventDefault();
                    event.currentTarget.blur();

                    login(ConnectorNames.Injected);
                  }}
                  className={"nav-link btn btn-dark text-white"}
                >{isConnecting ? "Connecting..." : "Connect"}</a>
              )}
            </Nav>
          </BSNavbar.Collapse>
        </div>
      </BSNavbar>
    </>
  );
}
