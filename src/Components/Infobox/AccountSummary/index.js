/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const AccountSummary = props => {
   return (
      <section className="account-summary">
         {/* <section className="account-summary-boxes">
            <div>
               <span>Income</span>
               <strong>&pound; {props.income7Days}</strong>
            </div>
            <div>
               <span>Expenses</span>
               <strong>&pound; {props.expenses7Days}</strong>
            </div>
         </section> */}

         <section className="account-summary-total">
            <span style={{color: '#000000', fontSize: 20}}>Số dư</span>
            <strong>{Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(props.balance)}</strong>
         </section>
      </section>
   );
};

AccountSummary.propTypes = {
   income7Days: PropTypes.number,
   expenses7Days: PropTypes.number,
   balance: PropTypes.number
};

export default AccountSummary;
