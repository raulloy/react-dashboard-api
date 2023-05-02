import React, { useContext } from 'react';
import { AccountsDataStoreContext } from '../../data/AccountsDataStore';
import { FaRegBuilding } from 'react-icons/fa';
import Card from '../Card/Card';
import './Cards.css';

const Cards = () => {
  const { accountInsights } = useContext(AccountsDataStoreContext);

  // Calculate Grand Total Spend
  const grandTotalSpend = accountInsights.reduce((total, element) => {
    return total + parseFloat(element.spend);
  }, 0);

  // Calculate the Average CPC
  const avgCPC =
    accountInsights.reduce((acc, curr) => acc + parseFloat(curr.cpc), 0) /
    accountInsights.length;

  const accounts = accountInsights.map((element) => element.account_name);
  const spendByAccount = accountInsights.map((element) => element.spend);
  const cpcByAccount = accountInsights.map((element) => element.cpc);

  return (
    <div className="Cards">
      <div className="parentContainer">
        <Card
          title="Total Gastado"
          color={{
            backGround: 'linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)',
            boxShadow: '0px 10px 20px 0px #e0c6f5',
          }}
          barValue={60}
          value={grandTotalSpend.toLocaleString('en-US', {
            minimumFractionDigits: 2,
          })}
          png={FaRegBuilding}
          series={[
            {
              name: 'Spend',
              data: spendByAccount,
            },
          ]}
          accounts={accounts}
        />
      </div>
      <div className="parentContainer">
        <Card
          title="CPC"
          color={{
            backGround: 'linear-gradient(180deg, #FF919D 0%, #FC929D 100%)',
            boxShadow: '0px 10px 20px 0px #FDC0C7',
          }}
          barValue={60}
          value={avgCPC.toFixed(2)}
          png={FaRegBuilding}
          series={[
            {
              name: 'CPC',
              data: cpcByAccount,
            },
          ]}
          accounts={accounts}
        />
      </div>
    </div>
  );
};

export default Cards;

// const accountInsights = [
//   {
//     account_id: '930432200705578',
//     account_name: 'HU LOMAS DE LA PLATA',
//     spend: '25320.21',
//     cpc: '1.276349',
//     ctr: '0.93048',
//     status: 'ACTIVE'
//   },
//   {
//     account_id: '177341126950476',
//     account_name: 'TRES LAGOS LIFESTYLE',
//     spend: '17290.45',
//     cpc: '2.158069',
//     ctr: '1.475996',
//     status: 'PAUSED'
//   },
//   {
//     account_id: '562909907769407',
//     account_name: 'HU AQUASOL',
//     spend: '17495.12',
//     cpc: '7.693544',
//     ctr: '2.149298',
//     status: 'ACTIVE'
//   },
// ];