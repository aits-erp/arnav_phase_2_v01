# Copyright (c) 2026, sukku and contributors
# For license information, please see license.txt

# Copyright (c) 2026, aits and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class DeliveryChallan(Document):

    def validate(self):
        # Automatically store the complete Delivery Challan Number
        # Example: DC/26-27/0001

        if self.name:
            self.dc_no = self.name