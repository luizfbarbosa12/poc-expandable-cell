import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

// Define the data type for the table rows
interface TableRow {
  name: string;
  cpf: string;
  id: string;
  number: number;
  price: string;
  pricePaid: string;
  priceNotPaid: string;
  deadlineDate: string;
  dateOfPayment: string;
  nextChargeDate: string;
}

// Sample data to populate the table
const defaultData: TableRow[] = [
  {
    name: 'John Doe',
    cpf: '123.456.789-00',
    id: '001',
    number: 9,
    price: '$100',
    pricePaid: '$50',
    priceNotPaid: '$50',
    deadlineDate: '2024-10-01',
    dateOfPayment: '2024-09-25',
    nextChargeDate: '2024-11-01',
  },
  {
    name: 'Jane Smith',
    cpf: '987.654.321-00',
    id: '002',
    number: 9,
    price: '$200',
    pricePaid: '$100',
    priceNotPaid: '$100',
    deadlineDate: '2024-10-10',
    dateOfPayment: '2024-09-30',
    nextChargeDate: '2024-11-10',
  },
  // Add more rows as needed
];

// Define the column structure
const columns: ColumnDef<TableRow>[] = [
  {
    // Column for the + button
    id: 'expander',
    header: '',
    cell: ({ row }) => (
      <button
        onClick={() => row.toggleExpanded()}
        className="p-2"
      >
        {row.getIsExpanded() ? '-' : '+'}
      </button>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'cpf',
    header: 'CPF',
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'number',
    header: 'Number',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'pricePaid',
    header: 'Price Paid',
  },
  {
    accessorKey: 'priceNotPaid',
    header: 'Price Not Paid',
  },
  {
    accessorKey: 'deadlineDate',
    header: 'Deadline Date',
  },
  {
    accessorKey: 'dateOfPayment',
    header: 'Date of Payment',
  },
  {
    accessorKey: 'nextChargeDate',
    header: 'Next Credit Card Charge Date',
  },
];

const TableComponent: React.FC = () => {
  // Memoize the data and columns to avoid unnecessary re-renders
  const data = useMemo(() => defaultData, []);
  const tableColumns = useMemo(() => columns, []);

  // Initialize the table instance
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prevExpanded) =>
      prevExpanded.includes(rowId)
        ? prevExpanded.filter((id) => id !== rowId)
        : [...prevExpanded, rowId]
    );
  };

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: () => true
  });

  return (
    <div className="px-8 w-full text-sm">
      <div className="w-full">
        <div className="flex w-full">
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className="flex w-full">
              {headerGroup.headers.map((header) => (
                <div
                  key={header.id}
                  className="border border-gray-300 p-2 flex-1 text-left bg-gray-200"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Render the table body */}
        <div className="w-full">
          {table.getRowModel().rows.map((row) => (
            <div key={row.id}>
              <div className="flex h-12 transition-all duration-300 border-b border-gray-300">
                {row.getVisibleCells().map((cell) => (
                  <div
                    key={cell.id}
                    className="border border-gray-300 p-2 flex-1"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}

                <div className="flex items-center">
                  <button
                    onClick={() => toggleRowExpansion(row.id)}
                    className="p-2 bg-gray-200 border border-gray-300"
                  >
                    {expandedRows.includes(row.id) ? '-' : '+'}
                  </button>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                  expandedRows.includes(row.id) ? 'max-h-96' : 'max-h-0'
                }`}
              >
                {expandedRows.includes(row.id) && (
                  <div className="bg-gray-100 p-4 border border-gray-300">
                    <h3 className="text-lg font-semibold">Product Description</h3>
                    <ul className="list-disc pl-5 mb-4">
                      <li>High-quality material</li>
                      <li>Durable and long-lasting</li>
                      <li>Available in various sizes</li>
                      <li>1-year warranty included</li>
                    </ul>

                    <h4 className="text-md font-semibold mb-2">Additional Info:</h4>
                    <div className="overflow-auto">
                      <table className="w-full border-collapse border border-gray-400">
                        <thead>
                          <tr>
                            <th className="border border-gray-400 p-2">Feature</th>
                            <th className="border border-gray-400 p-2">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-400 p-2">Weight</td>
                            <td className="border border-gray-400 p-2">1.5kg</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-400 p-2">Dimensions</td>
                            <td className="border border-gray-400 p-2">30cm x 20cm x 15cm</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-400 p-2">Color</td>
                            <td className="border border-gray-400 p-2">Black</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
