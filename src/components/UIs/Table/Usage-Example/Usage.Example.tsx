'use client';
import React from 'react';
//= Modules
import { ColumnDef } from '@tanstack/react-table';
//= Components
import Table from "../index";
// import Columns from "./columns";
import TableCheckbox from '@/components/UIs/TableCheckbox';
//= Data
import tabledata from './database.json';

export interface Column {
  id: number;
  full_name: string;
  email: string;
  gender: string;
  country: string;
}

function UsageExample() {
  const Columns: ColumnDef<Column>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <TableCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1" >
          <TableCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    },
    {
      header: 'Full Name',
      accessorKey: 'full_name'
    },
    {
      header: 'Email',
      accessorKey: 'email'
    },
    {
      header: 'Gender',
      accessorKey: 'gender'
    },
    {
      header: 'Country',
      accessorKey: 'country'
    },
  ]

  return (
    <Table tabledata={tabledata} columns={Columns} />
  )
}

export default UsageExample