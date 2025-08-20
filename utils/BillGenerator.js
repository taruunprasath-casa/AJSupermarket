export class ConsoleBillGenerator {
    printBill(bill) {
        console.log("== Bill ==");
        bill.items.forEach((item) => {
            console.log(`${item.product.id} - ${item.product.name} - ${item.qty} - ${item.offerId} - ${item.product.pricePerUnit} - ${item.netPrice}`);
        });
        console.log("== Total ==");
        console.log(bill.total);
        console.log("========");
    }
}
//# sourceMappingURL=BillGenerator.js.map