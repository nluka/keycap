import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="text-center text-low p-4">
      <p className="m-0">
        Copyright &copy; 2021{' '}
        <a
          className="text-low"
          href="https://www.linkedin.com/in/nicholas-lukasevich/"
          rel="noreferrer"
          target="_blank"
        >
          Nicholas Lukasevich
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
}
