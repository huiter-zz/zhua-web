import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

function InvitePage() {
  return (
    <div>
      邀请码
    </div>
  );
}

InvitePage.propTypes = {
};

export default connect()(InvitePage);
