// Copyright (c) 2026, aits and contributors
// For license information, please see license.txt


frappe.listview_settings["Delivery Challan"] = {

    onload: function (listview) {

        // ==========================================
        // FROM ADDRESS FILTER
        // ==========================================

        listview.page.add_field({
            fieldname: "from_address_filter",
            label: "From Address",
            fieldtype: "Data"
        });


        // ==========================================
        // TO ADDRESS FILTER
        // ==========================================

        listview.page.add_field({
            fieldname: "to_address_filter",
            label: "To Address",
            fieldtype: "Data"
        });


        // ==========================================
        // FROM DATE FILTER
        // ==========================================

        listview.page.add_field({
            fieldname: "from_date_filter",
            label: "From Date",
            fieldtype: "Date"
        });


        // ==========================================
        // TO DATE FILTER
        // ==========================================

        listview.page.add_field({
            fieldname: "to_date_filter",
            label: "To Date",
            fieldtype: "Date"
        });


        // ==========================================
        // APPLY FILTERS
        // ==========================================

        function apply_filters() {

            let filters = {};

            let from_address =
                listview.page.fields_dict.from_address_filter.get_value();

            let to_address =
                listview.page.fields_dict.to_address_filter.get_value();

            let from_date =
                listview.page.fields_dict.from_date_filter.get_value();

            let to_date =
                listview.page.fields_dict.to_date_filter.get_value();


            // From Address
            if (from_address) {
                filters.from_address = ["like", "%" + from_address + "%"];
            }


            // To Address
            if (to_address) {
                filters.to_address = ["like", "%" + to_address + "%"];
            }


            // Date Range
            if (from_date && to_date) {

                filters.date = [
                    "between",
                    [from_date, to_date]
                ];

            } else if (from_date) {

                filters.date = [">=", from_date];

            } else if (to_date) {

                filters.date = ["<=", to_date];

            }


            // Clear only filters managed by this script
            listview.filter_area.clear();


            // Apply filters
            Object.keys(filters).forEach(function (fieldname) {

                listview.filter_area.add_filter(
                    "Delivery Challan",
                    fieldname,
                    filters[fieldname][0],
                    filters[fieldname][1]
                );

            });

            listview.refresh();

        }


        // ==========================================
        // TRIGGER ON CHANGE
        // ==========================================

        listview.page.fields_dict.from_address_filter.$input.on(
            "change",
            apply_filters
        );

        listview.page.fields_dict.to_address_filter.$input.on(
            "change",
            apply_filters
        );

        listview.page.fields_dict.from_date_filter.$input.on(
            "change",
            apply_filters
        );

        listview.page.fields_dict.to_date_filter.$input.on(
            "change",
            apply_filters
        );

    }

};