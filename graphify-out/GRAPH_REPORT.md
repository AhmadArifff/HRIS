# Graph Report - .  (2026-08-08)

## Corpus Check
- Large corpus: 631 files · ~465,602 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 232 nodes · 109 edges · 123 communities (13 shown, 110 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Admin alert
- Admin page
- Admin IntegrationItem
- Admin layout
- Admin chatlayout
- Admin ChatHeader
- Admin KanbanTaskData
- Employee clockin
- Admin page
- Admin apikeyslayout
- Admin NotificationDropdown
- Admin DataTableUser
- Admin TaskItemData
- Admin page
- Admin page
- Admin EmailItem
- Admin DatePicker
- Admin supportticketslayout
- Admin ticketreplylayout
- Admin appsidebar
- Employee DatePicker
- Admin AttendancePage
- Admin ShiftPage
- Admin DashboardPage
- Admin EmployeeAddPage
- Admin EmployeeProfilePage
- Admin EmployeeListPage
- Admin AdminLayout
- Admin LeavePage
- Admin OffboardingPage
- Admin Profile
- Admin DashboardPage
- Admin PayrollComponentsPage
- Admin PayrollGeneratePage
- Admin CandidateDetailPage
- Admin JobBoardPage
- Admin KanbanATSPage
- Admin AuthLayout
- Admin SignIn
- Admin SignUp
- Admin Error404
- Admin LandingPage
- Admin FullWidthPageLayout
- Admin RootLayout
- Admin NotFound
- Admin RootLandingPage
- Admin BarChartOne
- Admin LineChartOne
- Admin CodeGeneratorLayout
- Admin InvoiceItem
- Admin DemographicCard
- Admin MonthlySalesChart
- Admin MonthlyTarget
- Admin RecentOrders
- Admin OrderItem
- Admin StatisticsChart
- Admin Transaction
- Admin DefaultModal
- Admin FormInModal
- Admin FullScreenModal
- Admin ModalBasedAlerts
- Admin VerticallyCenteredModal
- Admin FolderItem
- Admin MediaStat
- Admin RecentFile
- Admin CashflowOverview
- Admin FinanceMetrics
- Admin MyCards
- Admin QuickSend
- Admin RecentTransactions
- Admin Spending
- Admin TotalBalance
- Admin CheckboxComponents
- Admin DefaultInputs
- Admin FileInputExample
- Admin InputGroup
- Admin InputStates
- Admin RadioButtons
- Admin SelectInputs
- Admin TextAreaInput
- Admin ToggleSwitch
- Admin AttendanceRecord
- Admin EmployeeData
- Admin LeaveRecord
- Admin MasterShift
- Admin ShiftAssignment
- Admin SalesByChannel
- Admin SalesByCountry
- Admin SalesMetrics
- Admin TopProducts
- Admin UserRetention
- Admin UsersRevenueStatistics
- Admin BasicTableOne
- Admin ResponsiveImage
- Admin ThreeColumnImageGrid
- Admin TwoColumnImageGrid
- Admin VideosExample
- Admin FourIsToThree
- Admin OneIsToOne
- Admin SixteenIsToNine
- Admin TwentyOneIsToNine
- Employee AttendancePage
- Employee RootLayout
- Employee LeavePage
- Employee EmployeeDashboard
- Employee PayrollPage
- Employee PerformancePage
- Employee ReimbursementPage
- Employee GridShape
- Employee ThemeTogglerTwo
- Employee CheckboxComponents
- Employee DefaultInputs
- Employee FileInputExample
- Employee InputGroup
- Employee InputStates
- Employee RadioButtons
- Employee SelectInputs
- Employee TextAreaInput
- Employee ToggleSwitch
- Employee ResponsiveImage
- Employee ThreeColumnImageGrid
- Employee TwoColumnImageGrid
- Employee VideosExample

## God Nodes (most connected - your core abstractions)
1. `index` - 53 edges
2. `ToastMessage` - 11 edges
3. `IntegrationItem` - 5 edges
4. `ToastMessage` - 4 edges
5. `codegeneratorlayout` - 4 edges
6. `ApiKeyItem` - 3 edges
7. `ChatContact` - 3 edges
8. `GridShape` - 3 edges
9. `KanbanTaskData` - 3 edges
10. `page` - 3 edges

## Surprising Connections (you probably didn't know these)
- `integrationdetailsmodalprops` --references--> `IntegrationItem`  [EXTRACTED]
  apps/admin-dashboard/src/components/integrations/IntegrationDetailsModal.tsx → apps/admin-dashboard/src/components/integrations/IntegrationCard.tsx
- `integrationsgridprops` --references--> `IntegrationItem`  [EXTRACTED]
  apps/admin-dashboard/src/components/integrations/IntegrationsGrid.tsx → apps/admin-dashboard/src/components/integrations/IntegrationCard.tsx
- `editapikeymodalprops` --references--> `ApiKeyItem`  [EXTRACTED]
  apps/admin-dashboard/src/components/api-keys/EditApiKeyModal.tsx → apps/admin-dashboard/src/components/api-keys/ApiKeyTableCard.tsx
- `chatmessagestreamprops` --references--> `ChatContact`  [EXTRACTED]
  apps/admin-dashboard/src/components/chat/ChatMessageStream.tsx → apps/admin-dashboard/src/components/chat/ChatSidebar.tsx
- `kanbancolumnprops` --references--> `KanbanTaskData`  [EXTRACTED]
  apps/admin-dashboard/src/components/task/task-kanban/KanbanColumn.tsx → apps/admin-dashboard/src/components/task/task-kanban/KanbanCard.tsx

## Import Cycles
- 1-file cycle: `apps/admin-dashboard/src/icons/index.tsx -> apps/admin-dashboard/src/icons/index.tsx`

## Communities (123 total, 110 thin omitted)

### Community 0 - "Admin alert"
Cohesion: 0.04
Nodes (54): alert, down, up, down, right, up, audio, bell (+46 more)

### Community 1 - "Admin page"
Cohesion: 0.17
Nodes (12): page, page, employeefaceauthmodal, signinform, attendancetable, employeetable, leavetable, offboardingtable (+4 more)

### Community 2 - "Admin IntegrationItem"
Cohesion: 0.33
Nodes (6): IntegrationItem, integrationdetailsmodal, integrationsgrid, integrationslayout, integrationdetailsmodalprops, integrationsgridprops

### Community 3 - "Admin layout"
Cohesion: 0.40
Nodes (5): layout, page, found, GridShape, ThemeTogglerTwo

### Community 4 - "Admin chatlayout"
Cohesion: 0.40
Nodes (5): chatlayout, chatmessagestream, chatmessagestreamprops, MessageItem, ChatContact

### Community 5 - "Admin ChatHeader"
Cohesion: 0.40
Nodes (5): ChatHeader, CodeChatSidebar, codegeneratorlayout, MessageInput, MessageList

### Community 6 - "Admin KanbanTaskData"
Cohesion: 0.40
Nodes (5): KanbanTaskData, kanbancolumn, KanbanFilterTab, taskkanbanlayout, kanbancolumnprops

### Community 7 - "Employee clockin"
Cohesion: 0.40
Nodes (5): clockin, leaveform, performanceform, reimbursementform, ToastMessage

### Community 8 - "Admin page"
Cohesion: 0.50
Nodes (4): page, UserAddressCard, UserInfoCard, UserMetaCard

### Community 9 - "Admin apikeyslayout"
Cohesion: 0.50
Nodes (4): apikeyslayout, ApiKeyItem, editapikeymodal, editapikeymodalprops

### Community 10 - "Admin NotificationDropdown"
Cohesion: 0.67
Nodes (3): NotificationDropdown, UserDropdown, appheader

### Community 11 - "Admin DataTableUser"
Cohesion: 0.67
Nodes (3): DataTableUser, datatablethree, datatabletwo

### Community 12 - "Admin TaskItemData"
Cohesion: 0.67
Nodes (3): TaskItemData, FilterTab, tasklistlayout

## Knowledge Gaps
- **216 isolated node(s):** `Profile`, `AttendancePage`, `ShiftPage`, `DashboardPage`, `EmployeeProfilePage` (+211 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **110 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Profile`, `AttendancePage`, `ShiftPage` to the rest of the system?**
  _216 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Admin alert` be split into smaller, more focused modules?**
  _Cohesion score 0.037037037037037035 - nodes in this community are weakly interconnected._