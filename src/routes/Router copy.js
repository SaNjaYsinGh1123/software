import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/Loadable';

// import ProtectedRoute from '../views/auth/PrivateRoute';
/****Layouts*****/

const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
/***** Pages ****/

const Minimal = Loadable(lazy(() => import('../views/dashboards/Minimal')));
const Analytical = Loadable(lazy(() => import('../views/dashboards/Analytical')));
const Demographical = Loadable(lazy(() => import('../views/dashboards/Demographical')));
const Modern = Loadable(lazy(() => import('../views/dashboards/Modern'))); 

/***** Pages added by s ****/
const  Team= Loadable(lazy(() => import('../views/dashboards/Team')));
const  Tafp= Loadable(lazy(() => import('../views/dashboards/Tafp')));

const  Customers= Loadable(lazy(() => import('../views/order/Customer/Customer')));
const  CustomersEdit= Loadable(lazy(() => import('../views/order/Customer/Edit')));
const  CustomersAdd= Loadable(lazy(() => import('../views/order/Customer/Add')));
const  CustomersAddress= Loadable(lazy(() => import('../views/order/Customer/Address')));
const  CustomersAddressEdit= Loadable(lazy(() => import('../views/order/Customer/AddressEdit')));
const  CustomersAddressAdd= Loadable(lazy(() => import('../views/order/Customer/AddressAdd')));
const  CustomersPendingReport= Loadable(lazy(() => import('../views/order/Customer/PendingReport')));

const  Orders= Loadable(lazy(() => import('../views/order/T')));

const  FactorySurplus= Loadable(lazy(() => import('../views/order/FactoryS/FactorySurplus')));
const  FactorySurplusEdit= Loadable(lazy(() => import('../views/order/FactoryS/Edit')));
const  FactorySurplusAdd= Loadable(lazy(() => import('../views/order/FactoryS/Add')));

const  OrderTemplates= Loadable(lazy(() => import('../views/order/OrderT/OrderTemplates')));
const  OrderTemplatesEdit= Loadable(lazy(() => import('../views/order/OrderT/Edit')));
const  OrderTemplatesAdd = Loadable(lazy(() => import('../views/order/OrderT/Add')));

const  ProductionPlan= Loadable(lazy(() => import('../views/operations/ProductionP/ProductionPlan')));
const  ProductionPlanView= Loadable(lazy(() => import('../views/operations/ProductionP/View')));


const  AdditionalTreat= Loadable(lazy(() => import('../views/operations/AdditionalT/AdditionalTreat')));
const  CustomInvoices= Loadable(lazy(() => import('../views/operations/CustomI/CustomInvoices')));
const  Dispatch= Loadable(lazy(() => import('../views/operations/Dispatchh/Dispatch')));
const  FindaRoll= Loadable(lazy(() => import('../views/operations/FindR/FindaRoll')));
const  Invoices= Loadable(lazy(() => import('../views/operations/Invoice/Invoices')));


const  QaPack = Loadable(lazy(() => import('../views/operations/QaP/QaPack')));
const  QaPackView = Loadable(lazy(() => import('../views/operations/QaP/View')));

const  StockManagement= Loadable(lazy(() => import('../views/operations/StockM/StockManagement')));
const  StockManagementOrderView= Loadable(lazy(() => import('../views/operations/StockM/OrderView')));

const  ByOrder = Loadable(lazy(() => import('../views/executive/ByO/ByOrder')));
const  BySmallRoll = Loadable(lazy(() => import('../views/executive/ByS/BySmallRoll')));
const  GsmAnalysisReport = Loadable(lazy(() => import('../views/executive/GsmA/GsmAnalysisReport')));
const  ProductionSalesReport = Loadable(lazy(() => import('../views/executive/ProductionS/ProductionSalesReport')));

const  SimpleDevelopment = Loadable(lazy(() => import('../views/product/SimpleD/simpleDevelopment')));

const  CreditAlerts = Loadable(lazy(() => import('../views/accounts/CreditA/CreditAlerts')));
const  Ledgers = Loadable(lazy(() => import('../views/accounts/Ledger/Ledgers')));
const  Payments = Loadable(lazy(() => import('../views/accounts/Payment/Payments')));
const  ResetAllLedgers = Loadable(lazy(() => import('../views/accounts/ResetA/ResetAllLedgers')));
const  Categories = Loadable(lazy(() => import('../views/inventory/Category/Categories')));
const  FindRawMaterial = Loadable(lazy(() => import('../views/inventory/FindR/FindRawMaterial')));
const  Purchases = Loadable(lazy(() => import('../views/inventory/Purchase/Purchases')));
const  RawMaterial = Loadable(lazy(() => import('../views/inventory/RawM/RawMaterial')));
const  RawMaterialDaily = Loadable(lazy(() => import('../views/inventory/RawMD/RawMaterialDaily')));
const  StockManagementIn = Loadable(lazy(() => import('../views/inventory/StockM/StockManagement')));
const  StockManagementHack = Loadable(lazy(() => import('../views/inventory/StockMH/StockManagementHack')));
const  Vendors = Loadable(lazy(() => import('../views/inventory/Vendor/Vendors')));

const  Factory = Loadable(lazy(() => import('../views/factories/Factory')));
const  FactoryEdit = Loadable(lazy(() => import('../views/factories/Edit')));
const  FactoryAdd = Loadable(lazy(() => import('../views/factories/Add')));
const  FactoryEditAddress = Loadable(lazy(() => import('../views/factories/Address')));

const  User = Loadable(lazy(() => import('../views/users/User')));
const  UserEdit = Loadable(lazy(() => import('../views/users/Edit')));
const  UserAdd = Loadable(lazy(() => import('../views/users/Add')));

const  Role = Loadable(lazy(() => import('../views/roles/Role')));

const  AddressTypes = Loadable(lazy(() => import('../views/resources/AddressT/AddressTypes')));
const  AddressTypesEdit = Loadable(lazy(() => import('../views/resources/AddressT/Edit')));
const  AddressTypesAdd = Loadable(lazy(() => import('../views/resources/AddressT/Add')));

const  BomCoding = Loadable(lazy(() => import('../views/resources/BomC/BomCoding')));
const  BomCodingEdit = Loadable(lazy(() => import('../views/resources/BomC/Edit')));
const  BomCodingAdd = Loadable(lazy(() => import('../views/resources/BomC/Add')));

const  BomRawMaterial = Loadable(lazy(() => import('../views/resources/BomR/BomRawMaterial')));
const  BomRawMaterialEdit = Loadable(lazy(() => import('../views/resources/BomR/Edit')));
const  BomRawMaterialAdd = Loadable(lazy(() => import('../views/resources/BomR/Add')));

const  Cities = Loadable(lazy(() => import('../views/resources/City/Cities')));
const  CitiesEdit = Loadable(lazy(() => import('../views/resources/City/Edit')));
const  CitiesAdd = Loadable(lazy(() => import('../views/resources/City/Add')));

const  Colors = Loadable(lazy(() => import('../views/resources/Color/Colors')));
const  ColorsEdit = Loadable(lazy(() => import('../views/resources/Color/Edit')));
const  ColorsAdd = Loadable(lazy(() => import('../views/resources/Color/Add')));

const  ConfigDefault = Loadable(lazy(() => import('../views/resources/Config/ConfigDefault')));
const  ConfigDefaultEdit = Loadable(lazy(() => import('../views/resources/Config/Edit')));
const  ConfigDefaultAdd = Loadable(lazy(() => import('../views/resources/Config/Add')));

const  Countries = Loadable(lazy(() => import('../views/resources/Country/Countries')));
const  CountriesEdit = Loadable(lazy(() => import('../views/resources/Country/Edit')));
const  CountriesAdd = Loadable(lazy(() => import('../views/resources/Country/Add')));

const  Designs = Loadable(lazy(() => import('../views/resources/Design/Designs')));
const  DesignsEdit = Loadable(lazy(() => import('../views/resources/Design/Edit')));
const  DesignsAdd = Loadable(lazy(() => import('../views/resources/Design/Add')));

const  Embosses = Loadable(lazy(() => import('../views/resources/Emboss/Embosses')));
const  EmbossesEdit = Loadable(lazy(() => import('../views/resources/Emboss/Edit')));
const  EmbossesAdd= Loadable(lazy(() => import('../views/resources/Emboss/Add')));

const  Fabrics = Loadable(lazy(() => import('../views/resources/Fabrics/Fabrics')));
const  FabricsEdit = Loadable(lazy(() => import('../views/resources/Fabrics/Edit')));
const  FabricsAdd= Loadable(lazy(() => import('../views/resources/Fabrics/Add')));

const  Faults = Loadable(lazy(() => import('../views/resources/Fault/Faults')));
const  FaultsEdit = Loadable(lazy(() => import('../views/resources/Fault/Edit')));
const  FaultsAdd= Loadable(lazy(() => import('../views/resources/Fault/Add')));

const  Grades = Loadable(lazy(() => import('../views/resources/Grade/Grades')));
const  GradesEdit = Loadable(lazy(() => import('../views/resources/Grade/Edit')));
const  GradesAdd= Loadable(lazy(() => import('../views/resources/Grade/Add')));

const  Grains = Loadable(lazy(() => import('../views/resources/Grain/Grains')));
const  GrainsEdit = Loadable(lazy(() => import('../views/resources/Grain/Edit')));
const  GrainsAdd= Loadable(lazy(() => import('../views/resources/Grain/Add')));

const  HsnCodes = Loadable(lazy(() => import('../views/resources/Hsn/HsnCodes')));
const  HsnCodesEdit = Loadable(lazy(() => import('../views/resources/Hsn/Edit')));
const  HsnCodesAdd= Loadable(lazy(() => import('../views/resources/Hsn/Add')));

const  InventoryTypes = Loadable(lazy(() => import('../views/resources/Inventory/InventoryTypes')));
const  InventoryTypesEdit = Loadable(lazy(() => import('../views/resources/Inventory/Edit')));
const  InventoryTypesAdd= Loadable(lazy(() => import('../views/resources/Inventory/Add')));

const  LabTests = Loadable(lazy(() => import('../views/resources/Lab/LabTests')));
const  LabTestsEdit = Loadable(lazy(() => import('../views/resources/Lab/Edit')));
const  LabTestsAdd= Loadable(lazy(() => import('../views/resources/Lab/Add')));

const  OrderStatus = Loadable(lazy(() => import('../views/resources/Order/OrderStatus')));
const  OrderStatusEdit = Loadable(lazy(() => import('../views/resources/Order/Edit')));
const  OrderStatusAdd= Loadable(lazy(() => import('../views/resources/Order/Add')));

const  PasteTypes = Loadable(lazy(() => import('../views/resources/Paste/PasteTypes')));
const  PasteTypesEdit = Loadable(lazy(() => import('../views/resources/Paste/Edit')));
const  PasteTypesAdd= Loadable(lazy(() => import('../views/resources/Paste/Add')));

const  QaPeTeams = Loadable(lazy(() => import('../views/resources/QaPe/QaPeTeams')));
const  QaPeTeamsEdit = Loadable(lazy(() => import('../views/resources/QaPe/Edit')));
const  QaPeTeamsAdd= Loadable(lazy(() => import('../views/resources/QaPe/Add')));

const  Qualities = Loadable(lazy(() => import('../views/resources/Quality/Qualities')));
const  QualitiesEdit = Loadable(lazy(() => import('../views/resources/Quality/Edit')));
const  QualitiesAdd= Loadable(lazy(() => import('../views/resources/Quality/Add')));

const  Severities = Loadable(lazy(() => import('../views/resources/Serverity/Severities')));
const  SeveritiesEdit = Loadable(lazy(() => import('../views/resources/Serverity/Edit')));
const  SeveritiesAdd= Loadable(lazy(() => import('../views/resources/Serverity/Add')));

const  Shades = Loadable(lazy(() => import('../views/resources/Shade/Shades')));
const  ShadesEdit = Loadable(lazy(() => import('../views/resources/Shade/Edit')));
const  ShadesAdd= Loadable(lazy(() => import('../views/resources/Shade/Add')));

const  States = Loadable(lazy(() => import('../views/resources/State/States')));
const  StatesEdit = Loadable(lazy(() => import('../views/resources/State/Edit')));
const  StatesAdd= Loadable(lazy(() => import('../views/resources/State/Add')));



/***** Apps ****/
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Chat = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/CalendarApp')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Shop = Loadable(lazy(() => import('../views/apps/ecommerce/Shop')));
const ShopDetail = Loadable(lazy(() => import('../views/apps/ecommerce/ShopDetail')));
const Treeview = Loadable(lazy(() => import('../views/apps/treeview/TreeView')));
const TicketList = Loadable(lazy(() => import('../views/apps/ticket/TicketList')));
const TicketDetail = Loadable(lazy(() => import('../views/apps/ticket/TicketDetail')));

/***** Ui Elements ****/
const Alerts = Loadable(lazy(() => import('../views/ui/Alerts')));
const Badges = Loadable(lazy(() => import('../views/ui/Badges')));
const Buttons = Loadable(lazy(() => import('../views/ui/Buttons')));
const Cards = Loadable(lazy(() => import('../views/ui/Cards')));
const Grid = Loadable(lazy(() => import('../views/ui/Grid')));
const Tables = Loadable(lazy(() => import('../views/ui/Tables')));
const Forms = Loadable(lazy(() => import('../views/ui/Forms')));
const Breadcrumbs = Loadable(lazy(() => import('../views/ui/Breadcrumbs')));
const Dropdowns = Loadable(lazy(() => import('../views/ui/DropDown')));
const BtnGroup = Loadable(lazy(() => import('../views/ui/BtnGroup')));
const Collapse = Loadable(lazy(() => import('../views/ui/Collapse')));
const ListGroup = Loadable(lazy(() => import('../views/ui/ListGroup')));
const Modal = Loadable(lazy(() => import('../views/ui/Modal')));
const Navbar = Loadable(lazy(() => import('../views/ui/Navbar')));
const Nav = Loadable(lazy(() => import('../views/ui/Nav')));
const Pagination = Loadable(lazy(() => import('../views/ui/Pagination')));
const Popover = Loadable(lazy(() => import('../views/ui/Popover')));
const Progress = Loadable(lazy(() => import('../views/ui/Progress')));
const Spinner = Loadable(lazy(() => import('../views/ui/Spinner')));
const Tabs = Loadable(lazy(() => import('../views/ui/Tabs')));
const Toasts = Loadable(lazy(() => import('../views/ui/Toasts')));
const Tooltip = Loadable(lazy(() => import('../views/ui/Tooltip')));

/***** Form Layout Pages ****/
const FormBasic = Loadable(lazy(() => import('../views/form-layouts/FormBasic')));
const FormGrid = Loadable(lazy(() => import('../views/form-layouts/FormGrid')));
const FormGroup = Loadable(lazy(() => import('../views/form-layouts/FormGroup')));
const FormInput = Loadable(lazy(() => import('../views/form-layouts/FormInput')));

/***** Form Pickers Pages ****/
const Datepicker = Loadable(lazy(() => import('../views/form-pickers/DateTimePicker')));
const TagSelect = Loadable(lazy(() => import('../views/form-pickers/TagSelect')));

/***** Form Validation Pages ****/
const FormValidate = Loadable(lazy(() => import('../views/form-validation/FormValidation')));
const FormSteps = Loadable(lazy(() => import('../views/form-steps/Steps')));
const FormEditor = Loadable(lazy(() => import('../views/form-editor/FormEditor')));
/***** Table Pages ****/
const Basictable = Loadable(lazy(() => import('../views/tables/TableBasic')));
const CustomReactTable = Loadable(lazy(() => import('../views/tables/CustomReactTable')));
const ReactBootstrapTable = Loadable(lazy(() => import('../views/tables/ReactBootstrapTable')));

/***** Chart Pages ****/
const ApexCharts = Loadable(lazy(() => import('../views/charts/ApexCharts')));
const ChartJs = Loadable(lazy(() => import('../views/charts/ChartJs')));

/***** Sample Pages ****/
const StarterKit = Loadable(lazy(() => import('../views/sample-pages/StarterKit')));
const Profile = Loadable(lazy(() => import('../views/sample-pages/Profile')));
const Gallery = Loadable(lazy(() => import('../views/sample-pages/Gallery')));
const SearchResult = Loadable(lazy(() => import('../views/sample-pages/SearchResult')));
const HelperClass = Loadable(lazy(() => import('../views/sample-pages/HelperClass')));

/***** Icon Pages ****/
const Bootstrap = Loadable(lazy(() => import('../views/icons/Bootstrap')));
const Feather = Loadable(lazy(() => import('../views/icons/Feather')));

/***** Map Pages ****/
const CustomVectorMap = Loadable(lazy(() => import('../views/maps/CustomVectorMap')));

/***** Widget Pages ****/
const Widget = Loadable(lazy(() => import('../views/widget/Widget')));

/***** CASL Access Control ****/
const CASL = Loadable(lazy(() => import('../views/apps/accessControlCASL/AccessControl')));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
const RegisterFormik = Loadable(lazy(() => import('../views/auth/RegisterFormik')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));
const Maintanance = Loadable(lazy(() => import('../views/auth/Maintanance')));
const LockScreen = Loadable(lazy(() => import('../views/auth/LockScreen')));
const RecoverPassword = Loadable(lazy(() => import('../views/auth/RecoverPassword')));

/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', name: 'Home', element:  <Navigate to="/dashboards/minimal" />   },
      { path: '/dashboards/minimal', name: 'Minimal', exact: true, element: <Minimal />   },
      { path: '/dashboards/analytical', name: 'Analytical', exact: true, element: <Analytical/>   },
      { path: '/dashboards/demographical', name: 'Demographical', exact: true, element:  <Demographical />  },
      { path: '/dashboards/modern', name: 'Modern', exact: true, element: <Modern />  },

      /*****Routes added by s******/
      { path: '/dashboards/team', name: 'Modern', exact: true, element: <Team /> },
      { path: '/dashboards/tafp', name: 'Modern', exact: true, element: <Tafp /> },

      { path: '/order/customers', name: 'Modern', exact: true, element:  <Customers />  },
      { path: '/order/customers/edit', name: 'Modern', exact: true, element:  <CustomersEdit />  },
      { path: '/order/customers/add', name: 'Modern', exact: true, element:  <CustomersAdd />  },
      { path: '/order/customers/address', name: 'Modern', exact: true, element:  <CustomersAddress />  },
      { path: '/order/customers/address/edit', name: 'Modern', exact: true, element:  <CustomersAddressEdit />  },
      { path: '/order/customers/address/add', name: 'Modern', exact: true, element:  <CustomersAddressAdd />  },
      { path: '/order/customers/pending-report', name: 'Modern', exact: true, element:  <CustomersPendingReport />  },



      { path: '/order/orders', name: 'Modern', exact: true, element:  <Orders />  },
      { path: '/order/factory-surplus', name: 'Modern', exact: true, element:  <FactorySurplus />  },
      { path: '/order/factory-surplus/edit', name: 'Modern', exact: true, element:  <FactorySurplusEdit />  },
      { path: '/order/factory-surplus/add', name: 'Modern', exact: true, element:  <FactorySurplusAdd />  },

      { path: '/order/order-templates', name: 'Modern', exact: true, element:  <OrderTemplates />   },
      { path: '/order/order-templates/edit', name: 'Modern', exact: true, element:  <OrderTemplatesEdit />   },
      { path: '/order/order-templates/add', name: 'Modern', exact: true, element:  <OrderTemplatesAdd />   },

      { path: '/operations/production-plans', name: 'Modern', exact: true, element:  <ProductionPlan />  },
      { path: '/operations/production-plans/view', name: 'Modern', exact: true, element:  <ProductionPlanView />  },
      

      { path: '/operations/additional-treatment', name: 'Modern', exact: true, element:  <AdditionalTreat />  },
      { path: '/operations/custom-invoices', name: 'Modern', exact: true, element:  <CustomInvoices />  },
      { path: '/operations/dispatch', name: 'Modern', exact: true, element:  <Dispatch />  },
      { path: '/operations/find-a-roll', name: 'Modern', exact: true, element:  <FindaRoll />  },
      { path: '/operations/invoices', name: 'Modern', exact: true, element:  <Invoices />  },

      { path: '/operations/qa-packaging', name: 'Modern', exact: true, element:  <QaPack />  },
      { path: '/operations/qa-packaging/jumboroll', name: 'Modern', exact: true, element:  <QaPackView />  },

      { path: '/operations/stock-management', name: 'Modern', exact: true, element:  <StockManagement />  },
      { path: '/operations/stock-management/order-view', name: 'Modern', exact: true, element:  <StockManagementOrderView />  },

      { path: '/executive/by-order', name: 'Modern', exact: true, element:  <ByOrder />  },
      { path: '/executive/by-small-roll', name: 'Modern', exact: true, element:  <BySmallRoll />  },
      { path: '/executive/production-sales', name: 'Modern', exact: true, element:  <ProductionSalesReport />  },
      { path: '/executive/gsm-analysis', name: 'Modern', exact: true, element:  <GsmAnalysisReport />  },

      { path: '/product/sample-developments', name: 'Modern', exact: true, element:  <SimpleDevelopment />  },

      { path: '/accounts/payments', name: 'Modern', exact: true, element:  <Payments />  },
      { path: '/accounts/credit-alerts', name: 'Modern', exact: true, element:  <CreditAlerts />  },
      { path: '/accounts/ledgers', name: 'Modern', exact: true, element:  <Ledgers />  },
      { path: '/accounts/reset-all-ledgers', name: 'Modern', exact: true, element:  <ResetAllLedgers />  },

      { path: '/inventory/vendors', name: 'Modern', exact: true, element:  <Vendors />  },
      { path: '/inventory/categories', name: 'Modern', exact: true, element:  <Categories />  },
      { path: '/inventory/raw-materials', name: 'Modern', exact: true, element:  <RawMaterial />  },
      { path: '/inventory/purchases', name: 'Modern', exact: true, element:  <Purchases />  },
      { path: '/inventory/stock-management', name: 'Modern', exact: true, element:  <StockManagementIn />  },
      { path: '/inventory/find-raw-material', name: 'Modern', exact: true, element:  <FindRawMaterial />  },
      { path: '/inventory/raw-material-daily-usage', name: 'Modern', exact: true, element:  <RawMaterialDaily />  },
      { path: '/inventory/stock-management-hack', name: 'Modern', exact: true, element:  <StockManagementHack />  },

      { path: '/factories/factory', name: 'Modern', exact: true, element:  <Factory />  },
      { path: '/factories/edit', name: 'Modern', exact: true, element:  <FactoryEdit />  },
      { path: '/factories/add', name: 'Modern', exact: true, element:  <FactoryAdd />  },
      { path: '/factories/edit/address', name: 'Modern', exact: true, element:  <FactoryEditAddress />  },

      { path: '/users/user', name: 'Modern', exact: true, element:  <User />  },
      { path: '/users/edit', name: 'Modern', exact: true, element:  <UserEdit />  },
      { path: '/users/add', name: 'Modern', exact: true, element:  <UserAdd />  },

      { path: '/roles/role', name: 'Modern', exact: true, element:  <Role />  },

      { path: '/resources/address-types', name: 'Modern', exact: true, element:  <AddressTypes />  },
      { path: '/resources/address-types/edit', name: 'Modern', exact: true, element:  <AddressTypesEdit />  },
      { path: '/resources/address-types/add', name: 'Modern', exact: true, element:  <AddressTypesAdd />  },

      { path: '/resources/bom-coding-category', name: 'Modern', exact: true, element:  <BomCoding />  },
      { path: '/resources/bom-coding-category/edit', name: 'Modern', exact: true, element:  <BomCodingEdit />  },
      { path: '/resources/bom-coding-category/add', name: 'Modern', exact: true, element:  <BomCodingAdd />  },

      { path: '/resources/bom-raw-material-category', name: 'Modern', exact: true, element:  <BomRawMaterial />  },
      { path: '/resources/bom-raw-material-category/edit', name: 'Modern', exact: true, element:  <BomRawMaterialEdit />  },
      { path: '/resources/bom-raw-material-category/add', name: 'Modern', exact: true, element:  <BomRawMaterialAdd />  },

      { path: '/resources/cities', name: 'Modern', exact: true, element:  <Cities />  },
      { path: '/resources/cities/edit', name: 'Modern', exact: true, element:  <CitiesEdit />  },
      { path: '/resources/cities/add', name: 'Modern', exact: true, element:  <CitiesAdd />  },

      { path: '/resources/colors', name: 'Modern', exact: true, element:  <Colors />  },
      { path: '/resources/colors/edit', name: 'Modern', exact: true, element:  <ColorsEdit />  },
      { path: '/resources/colors/add', name: 'Modern', exact: true, element:  <ColorsAdd />  },

      { path: '/resources/config-default', name: 'Modern', exact: true, element:  <ConfigDefault />  },
      { path: '/resources/config-default/edit', name: 'Modern', exact: true, element:  <ConfigDefaultEdit />  },
      { path: '/resources/config-default/add', name: 'Modern', exact: true, element:  <ConfigDefaultAdd />  },

      { path: '/resources/countries', name: 'Modern', exact: true, element:  <Countries />  },
      { path: '/resources/countries/edit', name: 'Modern', exact: true, element:  <CountriesEdit />  },
      { path: '/resources/countries/add', name: 'Modern', exact: true, element:  <CountriesAdd />  },

      { path: '/resources/designs', name: 'Modern', exact: true, element:  <Designs />  },
      { path: '/resources/designs/edit', name: 'Modern', exact: true, element:  <DesignsEdit />  },
      { path: '/resources/designs/add', name: 'Modern', exact: true, element:  <DesignsAdd />  },

      { path: '/resources/embosses', name: 'Modern', exact: true, element:  <Embosses />  },
      { path: '/resources/embosses/edit', name: 'Modern', exact: true, element:  <EmbossesEdit />  },
      { path: '/resources/embosses/add', name: 'Modern', exact: true, element:  <EmbossesAdd />  },

      { path: '/resources/fabrics', name: 'Modern', exact: true, element:  <Fabrics />  },
      { path: '/resources/fabrics/edit', name: 'Modern', exact: true, element:  <FabricsEdit />  },
      { path: '/resources/fabrics/add', name: 'Modern', exact: true, element:  <FabricsAdd />  },

      { path: '/resources/faults', name: 'Modern', exact: true, element:  <Faults />  },
      { path: '/resources/faults/edit', name: 'Modern', exact: true, element:  <FaultsEdit />  },
      { path: '/resources/faults/add', name: 'Modern', exact: true, element:  <FaultsAdd />  },

      { path: '/resources/grades', name: 'Modern', exact: true, element:  <Grades />  },
      { path: '/resources/grades/edit', name: 'Modern', exact: true, element:  <GradesEdit />  },
      { path: '/resources/grades/add', name: 'Modern', exact: true, element:  <GradesAdd />  },

      { path: '/resources/grains', name: 'Modern', exact: true, element:  <Grains />  },
      { path: '/resources/grains/edit', name: 'Modern', exact: true, element:  <GrainsEdit />  },
      { path: '/resources/grains/add', name: 'Modern', exact: true, element:  <GrainsAdd />  },

      { path: '/resources/hsn-codes', name: 'Modern', exact: true, element:  <HsnCodes />  },
      { path: '/resources/hsn-codes/edit', name: 'Modern', exact: true, element:  <HsnCodesEdit />  },
      { path: '/resources/hsn-codes/add', name: 'Modern', exact: true, element:  <HsnCodesAdd />  },

      { path: '/resources/inventorytypes', name: 'Modern', exact: true, element:  <InventoryTypes />  },
      { path: '/resources/inventorytypes/edit', name: 'Modern', exact: true, element:  <InventoryTypesEdit />  },
      { path: '/resources/inventorytypes/add', name: 'Modern', exact: true, element:  <InventoryTypesAdd />  },

      { path: '/resources/lab-tests', name: 'Modern', exact: true, element:  <LabTests />  },
      { path: '/resources/lab-tests/edit', name: 'Modern', exact: true, element:  <LabTestsEdit />  },
      { path: '/resources/lab-tests/add', name: 'Modern', exact: true, element:  <LabTestsAdd />  },

      { path: '/resources/order-status', name: 'Modern', exact: true, element:  <OrderStatus />  },
      { path: '/resources/order-status/edit', name: 'Modern', exact: true, element:  <OrderStatusEdit />  },
      { path: '/resources/order-status/add', name: 'Modern', exact: true, element:  <OrderStatusAdd />  },

      { path: '/resources/paste-types', name: 'Modern', exact: true, element:  <PasteTypes />  },
      { path: '/resources/paste-types/edit', name: 'Modern', exact: true, element:  <PasteTypesEdit />  },
      { path: '/resources/paste-types/add', name: 'Modern', exact: true, element:  <PasteTypesAdd />  },

      { path: '/resources/qa-pe-teams', name: 'Modern', exact: true, element:  <QaPeTeams />  },
      { path: '/resources/qa-pe-teams/edit', name: 'Modern', exact: true, element:  <QaPeTeamsEdit />  },
      { path: '/resources/qa-pe-teams/add', name: 'Modern', exact: true, element:  <QaPeTeamsAdd />  },

      { path: '/resources/qualities', name: 'Modern', exact: true, element:  <Qualities />  },
      { path: '/resources/qualities/edit', name: 'Modern', exact: true, element:  <QualitiesEdit />  },
      { path: '/resources/qualities/add', name: 'Modern', exact: true, element:  <QualitiesAdd />  },

      { path: '/resources/severities', name: 'Modern', exact: true, element:  <Severities />  },
      { path: '/resources/severities/edit', name: 'Modern', exact: true, element:  <SeveritiesEdit />  },
      { path: '/resources/severities/add', name: 'Modern', exact: true, element:  <SeveritiesAdd />  },

      { path: '/resources/shades', name: 'Modern', exact: true, element:  <Shades />  },
      { path: '/resources/shades/edit', name: 'Modern', exact: true, element:  <ShadesEdit />  },
      { path: '/resources/shades/add', name: 'Modern', exact: true, element:  <ShadesAdd />  },

      { path: '/resources/states', name: 'Modern', exact: true, element:  <States />  },
      { path: '/resources/states/edit', name: 'Modern', exact: true, element:  <StatesEdit />  },
      { path: '/resources/states/add', name: 'Modern', exact: true, element:  <StatesAdd />  },



      { path: '/apps/notes', name: 'notes', exact: true, element: <Notes /> },
      { path: '/apps/chat', name: 'chat', exact: true, element: <Chat /> },
      { path: '/apps/contacts', name: 'contacts', exact: true, element: <Contacts /> },
      { path: '/apps/calendar', name: 'calendar', exact: true, element: <Calendar /> },
      { path: '/apps/email', name: 'email', exact: true, element: <Email /> },
      { path: '/ecom/shop', name: 'email', exact: true, element: <Shop /> },
      { path: '/ecom/shopdetail', name: 'email', exact: true, element: <ShopDetail /> },
      { path: '/tickt/ticket-list', name: 'ticket list', exact: true, element: <TicketList /> },
      {
        path: '/tickt/ticket-detail',
        name: 'ticket detail',
        exact: true,
        element: <TicketDetail />,
      },
      { path: '/apps/treeview', name: 'email', exact: true, element: <Treeview /> },
      { path: '/ui/alerts', name: 'alerts', exact: true, element: <Alerts /> },
      { path: '/ui/badges', name: 'badges', exact: true, element: <Badges /> },
      { path: '/ui/buttons', name: 'buttons', exact: true, element: <Buttons /> },
      { path: '/ui/cards', name: 'cards', exact: true, element: <Cards /> },
      { path: '/ui/grid', name: 'grid', exact: true, element: <Grid /> },
      { path: '/ui/table', name: 'table', exact: true, element: <Tables /> },
      { path: '/ui/forms', name: 'forms', exact: true, element: <Forms /> },
      { path: '/ui/breadcrumbs', name: 'breadcrumbs', exact: true, element: <Breadcrumbs /> },
      { path: '/ui/dropdown', name: 'dropdown', exact: true, element: <Dropdowns /> },
      { path: '/ui/button-group', name: 'button group', exact: true, element: <BtnGroup /> },
      { path: '/ui/collapse', name: 'collapse', exact: true, element: <Collapse /> },
      { path: '/ui/list-group', name: 'list-group', exact: true, element: <ListGroup /> },
      { path: '/ui/modal', name: 'modal', exact: true, element: <Modal /> },
      { path: '/ui/navbar', name: 'navbar', exact: true, element: <Navbar /> },
      { path: '/ui/nav', name: 'nav', exact: true, element: <Nav /> },
      { path: '/ui/pagination', name: 'pagination', exact: true, element: <Pagination /> },
      { path: '/ui/popover', name: 'popover', exact: true, element: <Popover /> },
      { path: '/ui/progress', name: 'progress', exact: true, element: <Progress /> },
      { path: '/ui/spinner', name: 'spinner', exact: true, element: <Spinner /> },
      { path: '/ui/tabs', name: 'tabs', exact: true, element: <Tabs /> },
      { path: '/ui/toasts', name: 'toasts', exact: true, element: <Toasts /> },
      { path: '/ui/tooltip', name: 'tooltip', exact: true, element: <Tooltip /> },
      { path: '/form-layout/form-basic', name: 'form-basic', exact: true, element: <FormBasic /> },
      { path: '/form-layout/form-grid', name: 'form-grid', exact: true, element: <FormGrid /> },
      { path: '/form-layout/form-group', name: 'form-group', exact: true, element: <FormGroup /> },
      { path: '/form-layout/form-input', name: 'form-input', exact: true, element: <FormInput /> },
      {
        path: '/form-pickers/datepicker',
        name: 'datepicker',
        exact: true,
        element: <Datepicker />,
      },
      { path: '/form-pickers/tag-select', name: 'tag-select', exact: true, element: <TagSelect /> },
      { path: '/form-validation', name: 'form-validation', exact: true, element: <FormValidate /> },
      { path: '/form-steps', name: 'form-steps', exact: true, element: <FormSteps /> },
      { path: '/form-editor', name: 'form-editor', exact: true, element: <FormEditor /> },

      { path: '/tables/basic-table', name: 'basic-table', exact: true, element: <Basictable /> },
      {
        path: '/tables/react-table',
        name: 'react-table',
        exact: true,
        element: <CustomReactTable />,
      },
      {
        path: '/tables/data-table',
        name: 'data-table',
        exact: true,
        element: <ReactBootstrapTable />,
      },
      { path: '/charts/apex', name: 'apex', exact: true, element: <ApexCharts /> },
      { path: '/charts/chartjs', name: 'chartjs', exact: true, element: <ChartJs /> },
      { path: '/sample-pages/profile', name: 'profile', exact: true, element: <Profile /> },
      {
        path: '/sample-pages/helper-class',
        name: 'helper-class',
        exact: true,
        element: <HelperClass />,
      },
      {
        path: '/sample-pages/starterkit',
        name: 'starterkit',
        exact: true,
        element: <StarterKit />,
      },
      { path: '/sample-pages/gallery', name: 'gallery', exact: true, element: <Gallery /> },
      {
        path: '/sample-pages/search-result',
        name: 'search-result',
        exact: true,
        element: <SearchResult />,
      },
      { path: '/icons/bootstrap', name: 'bootstrap', exact: true, element: <Bootstrap /> },
      { path: '/icons/feather', name: 'feather', exact: true, element: <Feather /> },
      { path: '/map/vector', name: 'vector', exact: true, element: <CustomVectorMap /> },
      { path: '/widget', name: 'widget', exact: true, element: <Widget /> },
      { path: '/casl', name: 'casl', exact: true, element: <CASL /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: 'registerformik', element: <RegisterFormik /> },
      { path: 'loginformik', element: <LoginFormik /> },
      { path: 'maintanance', element: <Maintanance /> },
      { path: 'lockscreen', element: <LockScreen /> },
      { path: 'recoverpwd', element: <RecoverPassword /> },
    ],
  },
];

export default ThemeRoutes;
