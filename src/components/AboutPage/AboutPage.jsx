import React from 'react';

function AboutPage() {
  return (
    <>
    <div className="HeaderFooterSpace"></div>
      <div className="container">
        <div>
          <h2>The Eisenhower Matrix concept</h2>

          <p>
            The Eisenhower Matrix is a productivity concept that organizes tasks based on 
            urgency and importance. Urgent and important tasks should be prioritized, urgent but 
            not important tasks should be delegated, important but not urgent tasks should be
            scheduled for later, and not urgent and not important tasks should be eliminated.
          </p>

          <p>
            "What Is Important Is Seldom Urgent and What Is Urgent Is Seldom Important" - Dwight D. Eisenhower
          </p>

          <h2>How to use Task Matrix</h2>

          <p>1. Add tasks by clicking the + button</p>
          <p>2. View tasks either in graph view, or list view formats</p>
          <p>3. Click on tasks to view task details</p>
          <p>4. Edit tasks to reflect updated details</p>
          <p>5. Complete tasks to move them to the Completed Task Archive</p>
          <p>6. Delete tasks to remove them from the list</p>
          <p>7. View overdue tasks in the Overdue Task Archive</p>
        
        </div>
      </div>
    <div className="HeaderFooterSpace"></div>
    </>
  );
}

export default AboutPage;
