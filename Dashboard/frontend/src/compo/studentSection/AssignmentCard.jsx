import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AssignmentCard = ({ assignments, onUpload, onSubmit }) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <Card className="p-6 shadow-md">
      <CardContent>
        <h3 className="text-xl font-bold text-blue-600 mb-4">
          📘 Student Assignment Portal
        </h3>
        <table className="w-full text-sm border border-gray-300 rounded-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left border">Title</th>
              <th className="p-3 text-left border">Subject</th>
              <th className="p-3 text-left border">Deadline</th>
              <th className="p-3 text-center border">Status</th>
              <th className="p-3 text-center border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr
                key={assignment.id}
                className={`${
                  assignment.submitted
                    ? "bg-green-100"
                    : assignment.deadline < today
                    ? "bg-red-100"
                    : ""
                }`}
              >
                <td className="p-3 border font-medium">{assignment.title}</td>
                <td className="p-3 border">{assignment.subject}</td>
                <td className="p-3 border">{assignment.deadline}</td>
                <td className="p-3 border text-center font-semibold text-green-700">
                  {assignment.submitted ? "✅ Submitted" : "⏳ Pending"}
                </td>
                <td className="p-3 border flex flex-col md:flex-row gap-2 justify-center items-center">
                  <a
                    href={assignment.file}
                    download
                    className="text-blue-600 border border-blue-600 rounded-md px-3 py-1 text-sm"
                  >
                    📥 Download
                  </a>
                  <input
                    type="file"
                    onChange={(e) => onUpload(e, assignment.id)}
                    className="text-sm"
                  />
                  <Button
                    onClick={() => onSubmit(assignment.id)}
                    disabled={assignment.submitted}
                    className={`${
                      assignment.submitted ? "bg-gray-400" : "bg-green-600"
                    } text-white px-4 py-1`}
                  >
                    {assignment.submitted ? "✅ Submitted" : "📤 Submit"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;
