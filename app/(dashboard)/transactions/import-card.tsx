/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import ImportTable from "./import-table";

const dateFormat = "yyyy-MM-dd HH:mm:ss"
const outputFormat = "yyyy-MM-dd";

const requiredOptions = [
    "amount",
    "date",
    "payee"
]

interface selectedColumnsState {
    [key: string]: string | null
}

type Props = {
    data: string[][]
    onCancel: () => void
    onSubmit: (data: any) => void
}
export default function ImportCard({ onCancel, onSubmit, data }: Props) {
    // console.log("data from import card: ",data[0])

    // state for selected columns
    const [selectedColumns, setSelectedColumns] = useState<selectedColumnsState>({});

    const headers = data[0];
    const body = data.slice(1);

    const onTableHeadSelectChange = (
        columnIndex: number,
        value: string | null
    ) => {
        setSelectedColumns((prev) => {
            const newSelectedColumns = { ...prev }
            for (const key in newSelectedColumns) {
                if (newSelectedColumns[key] === value) {
                    newSelectedColumns[key] = null
                }
            }

            if (value === "skip") {
                value = null
            }

            newSelectedColumns[`column_${columnIndex}`] = value
            return newSelectedColumns;
        })
    }

    return (
        <div className=" max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm ">
                <CardHeader className="gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between ">
                    <CardTitle className="text-xl line-clamp-1 ">
                        Import transaction
                    </CardTitle>
                    <div className="flex gap-2 items-center">
                        <Button className="w-full lg:w-auto" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* make conponent dor display import data */}
                    <ImportTable
                        headers={headers}
                        body={body}
                        selectedColumns={selectedColumns}
                        onTableHeadSelectChange={onTableHeadSelectChange}
                    />
                </CardContent>
            </Card>
        </div>
    )
}