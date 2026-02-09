import {
    Button,
  Colors,
  SmartTable,
  TableFilterBar,
  Tag,
  Text,
  type TableColumn,
  type TableFilter,
} from "@houssemdi2000/design-system";
import { useApps } from "../hooks/useApps";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";
import type { AppDto } from "../api/models/AppDto";
import { formatDate } from "../../../shared/appHelpers";

export default function AppsList() {
  const apps = useApps("455a490e-6cd9-423e-a458-e3f1281d7ffc").data;

  const isDarkMode = localStorage.getItem("mode") === "dark";

  const navigate = useNavigate();

  if (!apps || apps.length === 0) {
    return (
      <Text color={Colors.primary[500]} variant="subtitle" as="h1">
        No applications found.
      </Text>
    );
  }

  const columns: TableColumn<AppDto>[] = [
    { key: "name", label: "Name" },
    { key: "redirectUrl", label: "Redirect URL" },
    { key: "resetPasswordUrl", label: "Reset Password URL" },
    {
      key: "tokenExpiresIn",
      label: "Token expired in",
      render: (value) => value?.toString().replace("d", " days"),
    },
    {
      key: "resetTokenExpiresIn",
      label: "Reset token expired in",
      render: (value) => value?.toString().replace("m", " minutes"),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (value) =>
        formatDate(value as string)
    },
    {
      key: "isActive",
      label: "IsActif",
      render: (value) =>
        value ? (
          <Tag background={Colors.green[500]} label="Actif" />
        ) : (
          <Tag label="Inactif" />
        ),
    },
  ];

  const filtersConfig: TableFilter[] = [
    {
      type: "text",
      key: "search",
      label: "Search name",
      placeholder: "Type a name...",
    },
    {
      type: "checkbox",
      key: "active",
      label: "Active only",
    },
  ];

  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  /* =======================
   * FILTERED DATA
   * ======================= */
  const filteredData = useMemo(() => {
    return apps.filter((row) => {
      // search by name
      if (
        filters.search &&
        !row.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // filter active only
      if (filters.active && !row.isActive) {
        return false;
      }

      return true;
    });
  }, [apps, filters]);

  return (
    <>
      <TableFilterBar
        filters={filtersConfig}
        values={filters}
        onChange={handleFilterChange}
        onReset={() => setFilters({})}
        gap={100}
        isDarkMode={localStorage.getItem("mode") === "dark"}
      />

      {/* TABLE */}
      <SmartTable
        data={filteredData}
        columns={columns}
        enableSorting
        withCheckBox
        checkBoxColor={Colors.primary[500]}
        striped
        clickable
        onRowClick={(row) => alert(`Clicked: ${row.name}`)}
        emptyText="Non défini"
        withActions
        actions={<Button size="small" label="Edit" variant="danger" onClick={() => navigate(routes.updateApp("096abf93-b8db-4a37-98e2-bb28a605b215"))}/>}
        isDarkMode={isDarkMode}
      />
    </>
  );
}
