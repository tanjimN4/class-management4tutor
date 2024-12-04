"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useSession } from "next-auth/react";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(false);
  const session = useSession();

  let role = session.data?.user.role;
  useEffect(() => {
    if (role === "Admin") {
      setAdmin(true);
    }
  });
  console.log(admin);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Make an API request to fetch users
        const response = await axios.get("/api/dashboard/attendance");
        setUsers(response.data.users); // Ensure the API returns an array of users
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columnHelper = createColumnHelper();
  let columns;

  if (admin === true) {
    columns = [
      columnHelper.accessor("", {
        id: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "S.NO",
      }),
      columnHelper.accessor("name", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Name",
      }),
      columnHelper.accessor("email", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Email",
      }),
      columnHelper.accessor("Details", {
        cell: (info) => (
          <span>
            <button className="btn btn-sm btn-warning text-white">
              Details
            </button>
          </span>
        ),
        header: "Details",
      }),
      columnHelper.accessor("Delete", {
        cell: (info) => (
          <span>
            <button className="btn btn-sm btn-error text-white">Delete</button>
          </span>
        ),
        header: "Delete",
      }),
      columnHelper.accessor("Admin", {
        cell: (info) => (
          <span>
            <button className="btn btn-sm btn-primary text-white">
              Make Admin
            </button>
          </span>
        ),
        header: "Admin",
      }),
    ];
  } else {
    columns = [
      columnHelper.accessor("", {
        id: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "S.NO",
      }),
      columnHelper.accessor("name", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Name",
      }),
      columnHelper.accessor("email", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Email",
      }),
      columnHelper.accessor("Details", {
        cell: (info) => (
          <span>
            <button className="btn btn-sm btn-warning text-white">
              Details
            </button>
          </span>
        ),
        header: "Details",
      }),
    ];
  }

  const table = useReactTable({
    data: users, // Use the fetched users data
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 text-left">
          <thead className="bg-gray-600 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="capitalize px-2 md:px-4 py-2 text-sm md:text-base text-white"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-200"}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-2 md:px-4 py-2 text-sm md:text-base text-black"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.getPageCount() > 1 && (
        <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 border border-gray-300 px-2 disabled:opacity-30 bg-black text-white"
            >
              {"<"}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 border border-gray-300 px-2 disabled:opacity-30 bg-black text-white"
            >
              {">"}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white">Page</span>
            <strong className="text-sm text-white">
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white">Go to page</span>
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              className="border p-1 rounded bg-black text-white w-16"
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
