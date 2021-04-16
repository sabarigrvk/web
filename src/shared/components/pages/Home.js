import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "shared/store/app/actions";
const mapStateToProps = (state) => ({ users: state.users });
const Home = (props) => {
  useEffect(() => {
    props.fetchUsers();
  }, []);
  return (
    <>
      {/* {props.users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))} */}
      <p></p>
    </>
  );
};

const loadData = (store) => store.dispatch(fetchUsers());

export { loadData };

export default connect(mapStateToProps, { fetchUsers })(Home);
