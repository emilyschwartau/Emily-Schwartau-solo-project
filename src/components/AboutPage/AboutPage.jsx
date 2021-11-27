import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <>
    <div className="HeaderFooterSpace"></div>
    <div className="container">
      <div>
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
    </>
  );
}

export default AboutPage;
