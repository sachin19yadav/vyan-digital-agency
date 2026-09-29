"use client";

import { useState } from "react";
import {
  CreditCard,
  Plus,
  Printer,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Building2,
  Trash2,
  DollarSign,
  FileText,
} from "lucide-react";
import { hospitalInfo } from "@/data/hospitalSeedData";

export default function BillingManager({
  bills,
  setBills,
  patients,
  allStaff,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL | Paid | Partial | Pending
  const [isNewBillModalOpen, setIsNewBillModalOpen] = useState(false);
  const [printableBill, setPrintableBill] = useState(null); // Print modal

  // New Bill Form State
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || "");
  const [billItems, setBillItems] = useState([
    { name: "General Inpatient Care & Bed Charges", qty: 2, rate: 1200, amount: 2400, category: "Bed Charges" },
    { name: "Senior Consultant Doctor Visit", qty: 2, rate: 800, amount: 1600, category: "Doctor Fee" },
    { name: "Inpatient Medications & Injections", qty: 1, rate: 1450, amount: 1450, category: "Pharmacy" },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemRate, setNewItemRate] = useState("");
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemCategory, setNewItemCategory] = useState("General");
  const [discount, setDiscount] = useState(0);
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMode, setPaymentMode] = useState("UPI / GPay");

  const subtotal = billItems.reduce((acc, item) => acc + item.amount, 0);
  const grandTotal = Math.max(0, subtotal - (parseFloat(discount) || 0));
  const paidVal = parseFloat(amountPaid) || 0;
  const balanceDue = Math.max(0, grandTotal - paidVal);

  function handleAddLineItem() {
    if (!newItemName.trim() || !newItemRate) return;
    const rate = parseFloat(newItemRate) || 0;
    const qty = parseInt(newItemQty) || 1;
    const newItem = {
      name: newItemName.trim(),
      category: newItemCategory,
      rate,
      qty,
      amount: rate * qty,
    };
    setBillItems([...billItems, newItem]);
    setNewItemName("");
    setNewItemRate("");
    setNewItemQty(1);
  }

  function handleRemoveLineItem(index) {
    setBillItems(billItems.filter((_, i) => i !== index));
  }

  function handleCreateBillSubmit(e) {
    e.preventDefault();
    const pat = patients.find((p) => p.id === selectedPatientId) || patients[0];

    const billNumber = `ACH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const billStatus = balanceDue === 0 ? "Paid" : paidVal > 0 ? "Partial" : "Pending";

    const newBill = {
      id: `INV-${Date.now().toString().slice(-4)}`,
      billNumber,
      patientId: pat.id,
      patientName: pat.name,
      patientAge: pat.age,
      patientGender: pat.gender,
      admissionDate: pat.admissionDate ? new Date(pat.admissionDate).toLocaleDateString() : "OPD",
      dischargeDate: pat.status === "Discharged" ? "Discharged" : "Under Inpatient Care",
      doctorName: pat.primaryDoctorName,
      roomDetails: `${pat.floor} • ${pat.roomNo} (${pat.bedNo})`,
      billDate: new Date().toISOString().split("T")[0],
      items: billItems,
      subtotal,
      discount: parseFloat(discount) || 0,
      tax: 0,
      total: grandTotal,
      paid: paidVal,
      balance: balanceDue,
      status: billStatus,
      paymentMode,
      cashier: "Front Desk Accounts",
    };

    setBills([newBill, ...bills]);
    setIsNewBillModalOpen(false);
    setPrintableBill(newBill); // Open print preview automatically!
  }

  const filteredBills = bills.filter((b) => {
    const matchesSearch =
      b.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.billNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.paymentMode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.doctorName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || b.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: "24px 20px", maxWidth: 1300, margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#0f172a" }}>
            Hospital Inpatient &amp; Outpatient Billing &amp; Invoices
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#64748b" }}>
            Generate itemized discharge bills, trace consultation fees, bed charges, surgery, and medications.
          </p>
        </div>

        <button
          onClick={() => setIsNewBillModalOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#0284C7",
            color: "#0f172a",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            fontSize: "0.88rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(2, 132, 199, 0.4)",
          }}
        >
          <Plus size={16} />
          <span>+ Generate New Hospital Bill</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "14px 20px",
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            padding: "8px 14px",
            flex: "1 1 300px",
            maxWidth: 420,
          }}
        >
          <Search size={16} style={{ color: "#64748b" }} />
          <input
            type="text"
            placeholder="Search by Bill No, Patient Name, or Doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: "0.88rem",
              width: "100%",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {["ALL", "Paid", "Partial", "Pending"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                backgroundColor: statusFilter === st ? "#0284C7" : "#1E293B",
                color: statusFilter === st ? "#ffffff" : "#94A3B8",
                border: "1px solid #cbd5e1",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {st === "ALL" ? "All Invoices" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
              <th style={{ padding: "14px 18px" }}>Invoice / Bill No</th>
              <th style={{ padding: "14px 18px" }}>Patient &amp; Room</th>
              <th style={{ padding: "14px 18px" }}>Doctor</th>
              <th style={{ padding: "14px 18px" }}>Grand Total (₹)</th>
              <th style={{ padding: "14px 18px" }}>Paid (₹)</th>
              <th style={{ padding: "14px 18px" }}>Balance (₹)</th>
              <th style={{ padding: "14px 18px" }}>Status</th>
              <th style={{ padding: "14px 18px", textAlign: "right" }}>Print Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map((bill) => (
              <tr
                key={bill.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ fontWeight: 800, color: "#38BDF8" }}>{bill.billNumber}</div>
                  <div style={{ fontSize: "0.76rem", color: "#64748b" }}>Date: {bill.billDate}</div>
                </td>

                <td style={{ padding: "14px 18px" }}>
                  <div style={{ fontWeight: 700, color: "#ffffff" }}>{bill.patientName}</div>
                  <div style={{ fontSize: "0.76rem", color: "#64748b" }}>{bill.roomDetails}</div>
                </td>

                <td style={{ padding: "14px 18px" }}>
                  <div style={{ color: "#0f172a" }}>{bill.doctorName}</div>
                </td>

                <td style={{ padding: "14px 18px" }}>
                  <strong style={{ color: "#ffffff", fontSize: "0.95rem" }}>
                    ₹{bill.total.toLocaleString("en-IN")}
                  </strong>
                </td>

                <td style={{ padding: "14px 18px" }}>
                  <span style={{ color: "#34D399", fontWeight: 700 }}>
                    ₹{bill.paid.toLocaleString("en-IN")}
                  </span>
                  <div style={{ fontSize: "0.72rem", color: "#64748b" }}>{bill.paymentMode}</div>
                </td>

                <td style={{ padding: "14px 18px" }}>
                  {bill.balance > 0 ? (
                    <span style={{ color: "#F87171", fontWeight: 700 }}>
                      ₹{bill.balance.toLocaleString("en-IN")}
                    </span>
                  ) : (
                    <span style={{ color: "#64748b" }}>Nil (Paid)</span>
                  )}
                </td>

                <td style={{ padding: "14px 18px" }}>
                  <span
                    style={{
                      backgroundColor:
                        bill.status === "Paid"
                          ? "rgba(16, 185, 129, 0.15)"
                          : bill.status === "Partial"
                          ? "rgba(234, 179, 8, 0.15)"
                          : "rgba(239, 68, 68, 0.15)",
                      color:
                        bill.status === "Paid"
                          ? "#34D399"
                          : bill.status === "Partial"
                          ? "#FBBF24"
                          : "#F87171",
                      padding: "3px 10px",
                      borderRadius: "12px",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      border: `1px solid ${
                        bill.status === "Paid"
                          ? "rgba(16, 185, 129, 0.3)"
                          : "rgba(239, 68, 68, 0.3)"
                      }`,
                    }}
                  >
                    {bill.status}
                  </span>
                </td>

                <td style={{ padding: "14px 18px", textAlign: "right" }}>
                  <button
                    onClick={() => setPrintableBill(bill)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      backgroundColor: "#ffffff",
                      color: "#38BDF8",
                      border: "1px solid #cbd5e1",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <Printer size={14} />
                    <span>Print Bill</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: Generate New Hospital Bill */}
      {isNewBillModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "28px",
              maxWidth: 750,
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: 14,
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "#ffffff" }}>
                  Generate Hospital Invoice / Discharge Bill
                </h3>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  Select patient to automatically load charges and add custom services
                </span>
              </div>
              <button
                onClick={() => setIsNewBillModalOpen(false)}
                style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateBillSubmit}>
              {/* Select Patient */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: "0.82rem", color: "#64748b", marginBottom: 6 }}>
                  Select Inpatient / Outpatient *
                </label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.uhid}) — {p.floor} • {p.roomNo} ({p.status})
                    </option>
                  ))}
                </select>
              </div>

              {/* Line Items Table */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  marginBottom: 16,
                }}
              >
                <span style={{ fontSize: "0.84rem", fontWeight: 700, color: "#38BDF8", display: "block", marginBottom: 10 }}>
                  Billing Line Items
                </span>

                <table style={{ width: "100%", fontSize: "0.82rem", borderCollapse: "collapse", marginBottom: 12 }}>
                  <thead>
                    <tr style={{ color: "#64748b", borderBottom: "1px solid #334155" }}>
                      <th style={{ padding: "6px 8px", textAlign: "left" }}>Item Description</th>
                      <th style={{ padding: "6px 8px", textAlign: "center" }}>Qty</th>
                      <th style={{ padding: "6px 8px", textAlign: "right" }}>Rate (₹)</th>
                      <th style={{ padding: "6px 8px", textAlign: "right" }}>Amount (₹)</th>
                      <th style={{ padding: "6px 8px", textAlign: "center" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billItems.map((item, index) => (
                      <tr key={index} style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <td style={{ padding: "8px", color: "#0f172a" }}>{item.name}</td>
                        <td style={{ padding: "8px", textAlign: "center" }}>{item.qty}</td>
                        <td style={{ padding: "8px", textAlign: "right" }}>₹{item.rate}</td>
                        <td style={{ padding: "8px", textAlign: "right", fontWeight: 700 }}>₹{item.amount}</td>
                        <td style={{ padding: "8px", textAlign: "center" }}>
                          <button
                            type="button"
                            onClick={() => handleRemoveLineItem(index)}
                            style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Add Line Item Subform */}
                <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr auto", gap: 8, alignItems: "flex-end" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.74rem", color: "#64748b", marginBottom: 2 }}>
                      Service / Medicine Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ECG Test / ICU Rounds"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      style={{ width: "100%", backgroundColor: "#ffffff", color: "#ffffff", padding: "6px 8px", borderRadius: "4px", border: "1px solid #475569" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.74rem", color: "#64748b", marginBottom: 2 }}>
                      Category
                    </label>
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                      style={{ width: "100%", backgroundColor: "#ffffff", color: "#ffffff", padding: "6px 8px", borderRadius: "4px", border: "1px solid #475569" }}
                    >
                      <option value="Bed Charges">Bed</option>
                      <option value="Doctor Fee">Doctor</option>
                      <option value="Pharmacy">Medicine</option>
                      <option value="Diagnostics">Lab Test</option>
                      <option value="Surgical">Surgery</option>
                      <option value="General">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.74rem", color: "#64748b", marginBottom: 2 }}>
                      Qty / Days
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newItemQty}
                      onChange={(e) => setNewItemQty(e.target.value)}
                      style={{ width: "100%", backgroundColor: "#ffffff", color: "#ffffff", padding: "6px 8px", borderRadius: "4px", border: "1px solid #475569" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.74rem", color: "#64748b", marginBottom: 2 }}>
                      Rate (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="800"
                      value={newItemRate}
                      onChange={(e) => setNewItemRate(e.target.value)}
                      style={{ width: "100%", backgroundColor: "#ffffff", color: "#ffffff", padding: "6px 8px", borderRadius: "4px", border: "1px solid #475569" }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddLineItem}
                    style={{
                      backgroundColor: "#0D9488",
                      color: "#ffffff",
                      border: "none",
                      padding: "7px 12px",
                      borderRadius: "4px",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.8rem",
                    }}
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Total Summary & Payment */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div style={{ backgroundColor: "#ffffff", padding: "16px", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.86rem" }}>
                    <span style={{ color: "#64748b" }}>Subtotal:</span>
                    <strong style={{ color: "#ffffff" }}>₹{subtotal.toLocaleString("en-IN")}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, fontSize: "0.86rem" }}>
                    <span style={{ color: "#64748b" }}>Concession / Discount:</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      style={{ width: 100, backgroundColor: "#ffffff", color: "#ffffff", padding: "4px 8px", borderRadius: "4px", border: "1px solid #475569", textAlign: "right" }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid #334155", fontSize: "1.05rem" }}>
                    <strong style={{ color: "#38BDF8" }}>Grand Total:</strong>
                    <strong style={{ color: "#38BDF8" }}>₹{grandTotal.toLocaleString("en-IN")}</strong>
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", padding: "16px", borderRadius: "8px" }}>
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "#64748b", marginBottom: 4 }}>
                      Payment Received (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="Enter amount collected"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                      style={{ width: "100%", backgroundColor: "#ffffff", color: "#ffffff", padding: "6px 10px", borderRadius: "4px", border: "1px solid #475569", fontWeight: 700 }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: "0.85rem" }}>
                    <span style={{ color: "#64748b" }}>Pending Balance:</span>
                    <strong style={{ color: balanceDue > 0 ? "#F87171" : "#34D399" }}>
                      ₹{balanceDue.toLocaleString("en-IN")}
                    </strong>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "#64748b", marginBottom: 4 }}>
                      Payment Method
                    </label>
                    <select
                      value={paymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      style={{ width: "100%", backgroundColor: "#ffffff", color: "#ffffff", padding: "6px 8px", borderRadius: "4px", border: "1px solid #475569" }}
                    >
                      <option value="UPI / GPay / PhonePe">UPI / GPay / PhonePe</option>
                      <option value="Cash Counter">Cash Counter</option>
                      <option value="Debit / Credit Card">Debit / Credit Card</option>
                      <option value="Health Insurance (TPA)">Health Insurance (TPA)</option>
                      <option value="Net Banking / NEFT">Net Banking / NEFT</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsNewBillModalOpen(false)}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#64748b",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#0284C7",
                    color: "#0f172a",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "6px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Finalize &amp; Print Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINTABLE OFFICIAL HOSPITAL INVOICE RECEIPT */}
      {printableBill && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 110,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              color: "#0F172A",
              borderRadius: "12px",
              padding: "36px 40px",
              maxWidth: 780,
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {/* Top Close & Print Toolbar */}
            <div
              className="no-print"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
                paddingBottom: 14,
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#0F766E", fontWeight: 700 }}>
                <Printer size={18} />
                <span>Official Hospital Inpatient &amp; Discharge Receipt</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => window.print()}
                  style={{
                    backgroundColor: "#0D9488",
                    color: "#0f172a",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Printer size={16} />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setPrintableBill(null)}
                  style={{
                    backgroundColor: "#F1F5F9",
                    color: "#475569",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>

            {/* Official Hospital Header */}
            <div style={{ textAlign: "center", borderBottom: "2px solid #0F172A", paddingBottom: 16, marginBottom: 20 }}>
              <h2 style={{ margin: "0 0 4px", fontSize: "1.6rem", fontWeight: 900, color: "#0F766E" }}>
                {hospitalInfo.name}
              </h2>
              <p style={{ margin: "2px 0", fontSize: "0.85rem", color: "#475569" }}>
                {hospitalInfo.tagline}
              </p>
              <p style={{ margin: "2px 0", fontSize: "0.8rem", color: "#64748B" }}>
                {hospitalInfo.address} • Emergency Helpline: {hospitalInfo.emergencyPhone}
              </p>
              <p style={{ margin: "2px 0", fontSize: "0.75rem", color: "#64748b" }}>
                Reg No: {hospitalInfo.regNo} • GSTIN: {hospitalInfo.gstNo}
              </p>
            </div>

            {/* Invoice Meta Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                backgroundColor: "#ffffff",
                padding: "16px",
                borderRadius: "8px",
                fontSize: "0.84rem",
                marginBottom: 20,
              }}
            >
              <div>
                <div><strong>Invoice No:</strong> {printableBill.billNumber}</div>
                <div><strong>Date:</strong> {printableBill.billDate}</div>
                <div><strong>Attending Doctor:</strong> {printableBill.doctorName}</div>
                <div><strong>Ward / Bed:</strong> {printableBill.roomDetails}</div>
              </div>
              <div>
                <div><strong>Patient Name:</strong> <span style={{ fontSize: "0.95rem", fontWeight: 700 }}>{printableBill.patientName}</span></div>
                <div><strong>Admission:</strong> {printableBill.admissionDate}</div>
                <div><strong>Discharge:</strong> {printableBill.dischargeDate}</div>
                <div><strong>Payment Mode:</strong> {printableBill.paymentMode}</div>
              </div>
            </div>

            {/* Items Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", marginBottom: 20 }}>
              <thead>
                <tr style={{ backgroundColor: "#0F766E", color: "#ffffff" }}>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>#</th>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>Service / Item Description</th>
                  <th style={{ padding: "8px 12px", textAlign: "center" }}>Qty</th>
                  <th style={{ padding: "8px 12px", textAlign: "right" }}>Rate (₹)</th>
                  <th style={{ padding: "8px 12px", textAlign: "right" }}>Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {printableBill.items?.map((it, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #E2E8F0" }}>
                    <td style={{ padding: "8px 12px" }}>{idx + 1}</td>
                    <td style={{ padding: "8px 12px", fontWeight: 600 }}>{it.name}</td>
                    <td style={{ padding: "8px 12px", textAlign: "center" }}>{it.qty}</td>
                    <td style={{ padding: "8px 12px", textAlign: "right" }}>₹{it.rate}</td>
                    <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 700 }}>₹{it.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Calculations Breakdown */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
              <div style={{ width: 280, fontSize: "0.88rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                  <span style={{ color: "#64748B" }}>Subtotal:</span>
                  <strong>₹{printableBill.subtotal?.toLocaleString("en-IN")}</strong>
                </div>
                {printableBill.discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "#16A34A" }}>
                    <span>Discount:</span>
                    <strong>-₹{printableBill.discount?.toLocaleString("en-IN")}</strong>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: "2px solid #0F172A", fontSize: "1.05rem" }}>
                  <strong>Grand Total:</strong>
                  <strong style={{ color: "#0F766E" }}>₹{printableBill.total?.toLocaleString("en-IN")}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "#16A34A" }}>
                  <span>Amount Paid:</span>
                  <strong>₹{printableBill.paid?.toLocaleString("en-IN")}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: printableBill.balance > 0 ? "#DC2626" : "#475569" }}>
                  <span>Balance Due:</span>
                  <strong>₹{printableBill.balance?.toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, paddingTop: 20, borderTop: "1px dashed #CBD5E1" }}>
              <div style={{ textAlign: "center", width: 180 }}>
                <div style={{ height: 40 }}></div>
                <div style={{ borderTop: "1px solid #475569", paddingTop: 4, fontSize: "0.78rem", fontWeight: 600 }}>
                  Patient / Attendant Signature
                </div>
              </div>

              <div style={{ textAlign: "center", width: 200 }}>
                <div style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "#0F766E", fontSize: "0.75rem", fontStyle: "italic" }}>
                  Verified &amp; Cleared
                </div>
                <div style={{ borderTop: "1px solid #475569", paddingTop: 4, fontSize: "0.78rem", fontWeight: 600 }}>
                  Authorized Hospital Accounts
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
