import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WhatYouWillLearn = ({ initialPoints = [], onUpdate }) => {
  const [points, setPoints] = useState(initialPoints);
  const [newPoint, setNewPoint] = useState("");

  // Add a new point to the list
  const handleAddPoint = () => {
    if (newPoint.trim()) {
      setPoints((prev) => [...prev, newPoint.trim()]);
      setNewPoint("");
      if (onUpdate) onUpdate([...points, newPoint.trim()]);
    }
  };

  // Update a specific point in the list
  const handleEditPoint = (index, updatedPoint) => {
    const updatedPoints = points.map((point, i) =>
      i === index ? updatedPoint : point
    );
    setPoints(updatedPoints);
    if (onUpdate) onUpdate(updatedPoints);
  };

  // Remove a specific point from the list
  const handleRemovePoint = (index) => {
    const updatedPoints = points.filter((_, i) => i !== index);
    setPoints(updatedPoints);
    if (onUpdate) onUpdate(updatedPoints);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>What You Will Learn</Label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={newPoint}
            onChange={(e) => setNewPoint(e.target.value)}
            placeholder="Enter a new point"
          />
          <Button onClick={handleAddPoint}>Add</Button>
        </div>
      </div>

      {points.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Points:</h3>
          <ul className="space-y-2">
            {points.map((point, index) => (
              <li key={index} className="flex items-center gap-2">
                <Input
                  type="text"
                  value={point}
                  onChange={(e) => handleEditPoint(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="destructive"
                  onClick={() => handleRemovePoint(index)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WhatYouWillLearn;
