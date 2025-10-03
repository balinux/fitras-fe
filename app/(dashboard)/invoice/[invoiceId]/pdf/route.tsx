import { client } from "@/lib/hono";
import { type InferResponseType } from "hono/client";

import { Document, Page, Text, View, StyleSheet, renderToStream } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { convertAmountFromMilliUnit, formatCurrency, formatDateFromIsoString } from "@/lib/utils";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const transactionType = client.api.transactions[":id"].$get

type TransactionData = InferResponseType<typeof transactionType, 200>["data"];

export async function GET(
    request: Request,
    context: { params: Promise<{ invoiceId: string }> }
) {
    const { invoiceId } = await context.params;
    const response = await client.api.transactions[":id"].$get({
        param: {
            id: invoiceId,
        },
    }, {
        headers: {
            Cookie: request.headers.get("Cookie") || "",
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch transaction");
    }
    const { data } = await response.json();

    const stream = await renderToStream(<MyDocument data={data} />);

    return new NextResponse(stream as unknown as ReadableStream, {
        headers: {
            "Content-Type": "application/pdf",
        },
    });
}


// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        backgroundColor: "#ffffff",
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 5,
        fontWeight: "bold",
    },
    table: {
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10
    }
});

const MyDocument = ({ data }: { data: TransactionData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Invoice</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Invoice ID</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{data.id}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Payee</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{data.payee}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Amount</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{formatCurrency(convertAmountFromMilliUnit(data.amount))}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Date</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{formatDateFromIsoString(data.date)}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Notes</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{data.notes}</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);