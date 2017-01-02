import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

function ProfilePage() {
  return (
    <div>
      账号
    </div>
  );
}

ProfilePage.propTypes = {
};

export default connect()(ProfilePage);
