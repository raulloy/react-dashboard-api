// Sidebar imports
import {
  FaRegBuilding,
  FaRegFolder,
  FaRegSquare,
  FaRegChartBar,
} from 'react-icons/fa';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { TbReport } from 'react-icons/tb';
import { FiLogIn } from 'react-icons/fi';

// Recent Card Imports
import img1 from '../images/profile.png';

// Sidebar Data
export const SidebarData = [
  // {
  //   icon: MdOutlineSpaceDashboard,
  //   heading: 'Dashboard',
  // },
  {
    icon: FaRegBuilding,
    heading: 'FB Accounts',
    path: '/accounts',
  },
  {
    icon: FaRegFolder,
    heading: 'FB Campaigns',
    path: '/campaigns',
  },
  {
    icon: MdOutlineSpaceDashboard,
    heading: 'FB Ad Sets',
    path: '/ad-sets',
  },
  {
    icon: FaRegSquare,
    heading: 'FB Ads',
    path: '/ads',
  },
  {
    icon: TbReport,
    heading: 'FB Reporte General',
    path: '/general-report',
  },
  {
    icon: FaRegFolder,
    heading: 'Google Campaigns',
    path: '/google-campaigns',
  },
  {
    icon: MdOutlineSpaceDashboard,
    heading: 'Google AdGroups',
    path: '/google-ad_groups',
  },
  {
    icon: FaRegSquare,
    heading: 'Google Ads',
    path: '/google-ads',
  },
  {
    icon: TbReport,
    heading: 'General',
    path: '/general',
  },
  {
    icon: FaRegChartBar,
    heading: 'Analytics',
    path: '/analytics',
  },
  {
    icon: FiLogIn,
    heading: 'Profile',
    path: '/profile',
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    id: '1',
    title: 'Sales',
    color: {
      backGround: 'linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)',
      boxShadow: '0px 10px 20px 0px #e0c6f5',
    },
    barValue: 70,
    value: '25,970',
    png: FaRegBuilding,
    series: [
      {
        name: 'Sales',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    id: '2',
    title: 'Revenue',
    color: {
      backGround: 'linear-gradient(180deg, #FF919D 0%, #FC929D 100%)',
      boxShadow: '0px 10px 20px 0px #FDC0C7',
    },
    barValue: 80,
    value: '14,270',
    png: FaRegBuilding,
    series: [
      {
        name: 'Revenue',
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    id: '3',
    title: 'Importe Gastado',
    color: {
      backGround:
        'linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)',
      boxShadow: '0px 10px 20px 0px #F9D59B',
    },
    barValue: 60,
    value: '4,270',
    png: FaRegBuilding,
    accounts: [
      '2018-09-19T00:00:00.000Z',
      '2018-09-19T01:30:00.000Z',
      '2018-09-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-09-19T04:30:00.000Z',
      '2018-09-19T05:30:00.000Z',
      '2018-09-19T06:30:00.000Z',
    ],
    series: [
      {
        name: 'Importe Gastado',
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: 'Andrew Thomas',
    noti: 'has ordered Apple smart watch 2500mh battery.',
    time: '25 seconds ago',
  },
  {
    img: img1,
    name: 'James Bond',
    noti: 'has received Samsung gadget for charging battery.',
    time: '30 minutes ago',
  },
  {
    img: img1,
    name: 'Iron Man',
    noti: 'has ordered Apple smart watch, samsung Gear 2500mh battery.',
    time: '2 hours ago',
  },
];

export const accounts = [
  {
    name: 'HU LOMAS DE LA PLATA',
    id: 'act_930432200705578',
    company: 'HOGARES UNION',
  },
  {
    name: 'HU AQUASOL',
    id: 'act_562909907769407',
    company: 'HOGARES UNION',
  },
  {
    name: 'HU PALMAS TURQUESA',
    id: 'act_1087088964961886',
    company: 'HOGARES UNION',
  },
  {
    name: 'HU LAS TROJES',
    id: 'act_1256683497854234',
    company: 'HOGARES UNION',
  },
  {
    name: 'HU PALMAS YUCATÁN',
    id: 'act_195882471564062',
    company: 'HOGARES UNION',
  },
  {
    name: 'HU CIUDAD NATURA',
    id: 'act_176055110376237',
    company: 'HOGARES UNION',
  },
  {
    name: 'HU CASCOS AZULES',
    id: 'act_175324893748729',
    company: 'HOGARES UNION',
  },
  {
    name: 'HU MARINA TURQUESA',
    id: 'act_3671037146254618',
    company: 'HOGARES UNION',
  },
  {
    name: 'HU JARDINES DE LA LAGUNA',
    id: 'act_1116629645809089',
    company: 'HOGARES UNION',
  },
  {
    name: 'HU PASEOS DE LOS VIRREYES',
    id: 'act_3064079737176705',
    company: 'HOGARES UNION',
  },
  {
    name: 'HU BDI',
    id: 'act_793700688385551',
    company: 'HOGARES UNION',
  },
  {
    name: 'TRES LAGOS LIFESTYLE',
    id: 'act_177341126950476',
    company: 'HU LIFESTYLE',
  },
  {
    name: 'VILLAS DEL CAMPO LIFESTYLE',
    id: 'act_225593191779506',
    company: 'HU LIFESTYLE',
  },
  {
    name: 'SANTA FE LIFESTYLE',
    id: 'act_2480551222261700',
    company: 'HU LIFESTYLE',
  },
  {
    name: 'ADARA LIFESTYLE',
    id: 'act_159175185508724',
    company: 'HU LIFESTYLE',
  },
  {
    name: 'BALI LIFESTYLE',
    id: 'act_2190256254410586',
    company: 'HU LIFESTYLE',
  },
  {
    name: 'COSMOPOL LIFESTYLE',
    id: 'act_268790700756542',
    company: 'HU LIFESTYLE',
  },
  {
    name: 'SUMMIT PARK LIFESTYLE',
    id: 'act_2573491999594759',
    company: 'HU LIFESTYLE',
  },
  {
    name: 'BONZA LIFESTYLE',
    id: 'act_220463320629102',
    company: 'HU LIFESTYLE',
  },
  {
    name: 'BASALTO LIFESTYLE',
    id: 'act_258816553273090',
    company: 'HU LIFESTYLE',
  },
  {
    name: 'ABETO LIFESTYLE',
    id: 'act_611616064341722',
    company: 'HU LIFESTYLE',
  },
  {
    name: 'MERIDEN',
    id: 'act_2499601070366586',
    company: 'GIM LIVINGSPACES',
  },
  {
    name: 'CENTRAL PARK',
    id: 'act_265576294404103',
    company: 'GIM LIVINGSPACES',
  },
];

export const googleAccounts = [
  {
    name: 'HOGARES UNIÓN MARCA ADVANTAGE',
    id: '7462269823',
  },
  {
    name: 'HU LIFESTYLE',
    id: '5347167145',
  },
  {
    name: 'RESIDENCIAL CENTRALPARK',
    id: '9440485190',
  },
];
