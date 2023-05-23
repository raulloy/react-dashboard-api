import * as React from 'react';
import { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { accounts } from '../../data/data';
import { DateDropdown } from '../DatePickers/DateDropdown';
import { AdsDataStoreContext } from '../../data/AdsDataStore';
import { statusStyle } from './utils';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AdsCards from '../Cards/AdsCards';
import './Table.css';

export default function AdsTable() {
  const {
    since,
    setSince,
    until,
    setUntil,
    selectedAccount,
    setSelectedAccount,
    campaignInsights,
    contacts,
  } = useContext(AdsDataStoreContext);

  // console.log(
  //   campaignInsights
  //     .map((element) => element.adsets)
  //     .map((element) => element.data)
  //     .flat()
  // );

  const adSetsInsights = campaignInsights
    .map((element) => element.adsets)
    .map((element) => element.data)
    .flat()
    .map((element) => element.ads && element.ads.data)
    .filter(Boolean)
    .flat();
  // console.log(adSetsInsights);

  const grandTotalSpend = adSetsInsights.reduce((total, element) => {
    if (element.insights) {
      return total + parseFloat(element.insights.data[0].spend);
    }
    return total;
  }, 0);

  const adsData = campaignInsights
    .map((element) => element.adsets)
    .map((element) => element.data)
    .flat()
    .map((element) => (element.ads ? element.ads.data : []))
    .flat()
    .sort((a, b) => {
      if (
        a.insights &&
        a.insights.data &&
        a.insights.data[0] &&
        parseFloat(a.insights.data[0].spend) > 0
      ) {
        return -1;
      } else if (
        b.insights &&
        b.insights.data &&
        b.insights.data[0] &&
        parseFloat(b.insights.data[0].spend) > 0
      ) {
        return 1;
      } else {
        return 0;
      }
    });
  console.log(adsData);

  const contactsbyCampaign = contacts.map(({ id, properties }) => ({
    id,
    hs_analytics_first_url: properties.hs_analytics_first_url
      ? properties.hs_analytics_first_url.match(/hsa_ad=(\d+)/)?.[1]
      : null,
  }));

  // console.log('contactsbyCampaign', contactsbyCampaign);

  const contactCountsByCampaign = contactsbyCampaign.reduce((acc, contact) => {
    const campaign = adsData.find(
      (c) => c.id === contact.hs_analytics_first_url
    );
    const campaignId = campaign ? campaign.id : 'unknown';
    acc[campaignId] = (acc[campaignId] || 0) + 1;
    return acc;
  }, {});

  // console.log('contactCountsByCampaign', contactCountsByCampaign);

  const [show, setShow] = useState(false);
  const [contactsInfo, setContactsInfo] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (campaignID) => {
    const matchingCampaign = contactsbyCampaign.filter(
      (campaign) => campaign.hs_analytics_first_url === campaignID
    );

    const matchingContact = contacts.filter((contact) =>
      matchingCampaign.some((campaign) => campaign.id === contact.id)
    );

    setShow(true);

    if (matchingContact) {
      setContactsInfo(matchingContact);
    } else {
      console.log('No matching contact found.');
    }
  };

  const columns = [
    { field: 'adset', headerName: 'Conjunto de anuncios', width: 400 },
    { field: 'ad', headerName: 'Anuncio', width: 400 },
    { field: 'objective', headerName: 'Objetivo', width: 200 },
    { field: 'spent', headerName: 'Gastado', width: 200 },
    { field: 'results', headerName: 'Resultados', width: 200 },
    { field: 'costByResults', headerName: 'Costo/Resultado', width: 200 },
    {
      field: 'status',
      headerName: 'Estado',
      width: 100,
      renderCell: (params) => (
        <span className="status" style={statusStyle(params.row.status)}>
          {params.row.status}
        </span>
      ),
    },
    {
      field: 'assignments',
      headerName: 'Asignaciones',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button
          variant="link"
          className="Details"
          onClick={() => handleShow(params.row.id)}
        >
          {contactCountsByCampaign[params.row.id] || 0}
        </Button>
      ),
    },
    { field: 'reach', headerName: 'Alcance', width: 100 },
    { field: 'impressions', headerName: 'Impresiones', width: 100 },
    { field: 'clicks', headerName: 'Clics', width: 100 },
    { field: 'cpc', headerName: 'CPC', width: 100 },
    { field: 'ctr', headerName: 'CTR', width: 100 },
  ];

  const rows = adsData.map((row) => ({
    id: row.id,
    adset: row.adset.name,
    ad: row.name,
    objective: row.campaign.objective,
    spent: `$${parseFloat(
      row.insights ? row.insights.data[0].spend : 0
    ).toLocaleString('en-US')}`,
    results:
      row.campaign.objective === 'MESSAGES' &&
      row.insights &&
      row.insights.data &&
      row.insights.data[0].actions
        ? (
            row.insights.data[0].actions.find(
              (element) =>
                element.action_type ===
                'onsite_conversion.messaging_conversation_started_7d'
            ) || {}
          ).value + ' Msgs'
        : row.campaign.objective === 'OUTCOME_ENGAGEMENT' &&
          row.insights &&
          row.insights.data &&
          row.insights.data[0].actions
        ? (
            row.insights.data[0].actions.find(
              (element) => element.action_type === 'like'
            ) || {}
          ).value + ' Likes'
        : (row.campaign.objective === 'OUTCOME_LEADS' ||
            row.campaign.objective === 'LEAD_GENERATION') &&
          row.insights &&
          row.insights.data &&
          row.insights.data[0].actions
        ? (
            row.insights.data[0].actions.find(
              (element) => element.action_type === 'lead'
            ) || {}
          ).value + ' Leads'
        : (row.campaign.objective === 'LINK_CLICKS' ||
            row.campaign.objective === 'OUTCOME_TRAFFIC') &&
          row.insights &&
          row.insights.data &&
          row.insights.data[0].actions
        ? (
            row.insights.data[0].actions.find(
              (element) => element.action_type === 'link_click'
            ) || {}
          ).value + ' Clicks'
        : 0,
    costByResults: `$${(
      (row.insights ? row.insights.data[0].spend : 0) /
      parseFloat(
        row.campaign.objective === 'MESSAGES' &&
          row.insights &&
          row.insights.data &&
          row.insights.data[0].actions
          ? (
              row.insights.data[0].actions.find(
                (element) =>
                  element.action_type ===
                  'onsite_conversion.messaging_conversation_started_7d'
              ) || {}
            ).value
          : row.campaign.objective === 'OUTCOME_ENGAGEMENT' &&
            row.insights &&
            row.insights.data &&
            row.insights.data[0].actions
          ? (
              row.insights.data[0].actions.find(
                (element) => element.action_type === 'like'
              ) || {}
            ).value
          : (row.campaign.objective === 'OUTCOME_LEADS' ||
              row.campaign.objective === 'LEAD_GENERATION') &&
            row.insights &&
            row.insights.data &&
            row.insights.data[0].actions
          ? (
              row.insights.data[0].actions.find(
                (element) => element.action_type === 'lead'
              ) || {}
            ).value
          : (row.campaign.objective === 'LINK_CLICKS' ||
              row.campaign.objective === 'OUTCOME_TRAFFIC') &&
            row.insights &&
            row.insights.data &&
            row.insights.data[0].actions
          ? (
              row.insights.data[0].actions.find(
                (element) => element.action_type === 'link_click'
              ) || {}
            ).value
          : 1
      )
    ).toFixed(2)}`,
    status: row.status,
    assignments: [contactCountsByCampaign].reduce(
      (acc, obj) => (row.id in obj ? obj[row.id] : acc),
      0
    ),
    reach: parseInt(
      row.insights ? row.insights.data[0].reach : 0
    ).toLocaleString('en-US'),
    impressions: parseInt(
      row.insights ? row.insights.data[0].impressions : 0
    ).toLocaleString('en-US'),
    clicks: parseInt(
      row.insights ? row.insights.data[0].clicks : 0
    ).toLocaleString('en-US'),
    cpc: parseFloat(row.insights ? row.insights.data[0].cpc : 0).toFixed(2),
    ctr: parseFloat(row.insights ? row.insights.data[0].ctr : 0).toFixed(2),
  }));

  const footerRow = {
    id: 'grand-total',
    campaign: 'Grand Total',
    objective: '',
    spent: `$${grandTotalSpend.toLocaleString('en-US')}`,
  };

  return (
    <div>
      <AdsCards />
      <div className="Table">
        <h3>Ad Sets Insights</h3>

        <DateDropdown
          since={since}
          setSince={setSince}
          until={until}
          setUntil={setUntil}
          accounts={accounts}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
        />

        <div style={{ height: 350, width: '100%', marginTop: 30 }}>
          <DataGrid
            rows={[...rows, footerRow]}
            columns={columns}
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
          />
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Asignaciones</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ overflowX: 'auto' }}>
              <table className="popup-table">
                <thead>
                  <tr>
                    <th>Desarrollo</th>
                    <th>Canal de captación</th>
                    <th>Subcanal de captación</th>
                    <th>Fecha de asignación</th>
                    <th>Correo</th>
                    <th>Fecha de creación</th>
                    <th>Facilitador</th>
                    <th>Fuente original</th>
                    <th>Etapa del ciclo de vida</th>
                    <th>Estado del lead</th>
                  </tr>
                </thead>
                <tbody>
                  {contactsInfo.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.properties.desarrollo}</td>
                      <td>{contact.properties.canal_de_captacion}</td>
                      <td>{contact.properties.sub_canal_de_captacion}</td>
                      <td>
                        {new Date(
                          contact.properties.hubspot_owner_assigneddate
                        ).toLocaleDateString('es-MX')}
                      </td>
                      <td>{contact.properties.email}</td>
                      <td>
                        {new Date(
                          contact.properties.createdate
                        ).toLocaleDateString('es-MX')}
                      </td>
                      <td>{contact.properties.facilitador_compra_contacto}</td>
                      <td>{contact.properties.hs_analytics_source}</td>
                      <td>{contact.properties.lifecyclestage}</td>
                      <td>{contact.properties.hs_lead_status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
