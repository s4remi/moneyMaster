import { useContext } from "react";
import { PropTypes } from "prop-types";

import { AppNavBar } from "../layout/AppNavBar";
import { AppFooter } from "../layout/AppFooter";
import { ErrMsg } from "../components/ErrMsg";

import { ErrorContext } from "../main";

export default function BasePage({ children }) {
  const { error } = useContext(ErrorContext);

  return (
    <>
      <AppNavBar />

      {error.msg ? (
        <ErrMsg type={error.type}>
          <strong>{error.msg}</strong>
        </ErrMsg>
      ) : null}

      {children}

      <AppFooter />
    </>
  );
}

BasePage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
