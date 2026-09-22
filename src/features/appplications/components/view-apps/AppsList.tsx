import {
  Button,
  Colors,
  Pagination,
  SmartTable,
  Spacer,
  TableFilterBar,
  Tag,
  Text,
  type TableColumn,
  type TableFilter,
} from "@houssemdi2000/design-system";
import { useApps } from "../../hooks/useApps";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../routes/routes";
import type { AppDto } from "../../api/models/AppDto";
import { formatDate, maskId, PAGE_SIZE } from "../../../../shared/appHelpers";
import { FiArrowRight } from "react-icons/fi";

export default function AppsList() {
  const apps = useApps("455a490e-6cd9-423e-a458-e3f1281d7ffc").data;

  const isDarkMode = localStorage.getItem("mode") === "dark";

  const [page, setPage] = useState(1);

  const [initialState, setInitialState] = useState({
    selectedId: "",
  });

  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (initialState.selectedId) {
      navigate(routes.updateApp(initialState.selectedId));
    }
  };

  if (!apps || apps.length === 0) {
    return (
      <Text color={Colors.primary[500]} variant="subtitle" as="h1">
        No applications found.
      </Text>
    );
  }

  const columns: TableColumn<AppDto>[] = [
    { key: "name", label: "Nom d'application" },
    {
      key: "id",
      label: "ID client",
      render: (value) => maskId(value as string),
    },
    {
      key: "createdAt",
      label: "Date de création",
      render: (value) => formatDate(value as string),
    },
    {
      key: "isActive",
      label: "Statut",
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

  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

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

      <SmartTable
        data={paginatedData}
        columns={columns}
        enableSorting
        striped
        clickable
        onRowClick={(row) => setInitialState({ selectedId: row.id })}
        emptyText="Non défini"
        withActions
        bordered
        actions={
          <>
          <Button
            size="small"
            label="Voir"
            variant="light"
            icon={<FiArrowRight />}
            iconPosition="right"
            onClick={handleViewDetails}
          />
          </>
        }
        isDarkMode={isDarkMode}
      />
      <Pagination
        page={page}
        pageSize={PAGE_SIZE}
        total={filteredData.length}
        onPageChange={setPage}
        isDarkMode={isDarkMode}
      />
      <Spacer/>
    </>
  );
}
