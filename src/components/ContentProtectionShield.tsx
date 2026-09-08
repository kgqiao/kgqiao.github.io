import React, { useEffect, useState } from 'react';

/**
 * ContentProtectionShield
 * 
 * Provides comprehensive content and asset protection:
 * 1. Disables all text and element selection globally.
 * 2. Disables context menu (right-click) to prevent 'Save Image As...', 'Copy', and inspect.
 * 3. Prevents dragging of images, links, or text.
 * 4. Intercepts clipboard copy/cut operations.
 * 5. Intercepts screenshot shortcuts (PrintScreen, Win+Shift+S, Cmd+Shift+3/4/5) and clears clipboard.
 * 6. Implements anti-screenshot blackout shield: instantly blacks out the entire screen
 *    when the window loses focus, when a screenshot capture tool is invoked, or when visibility changes.
 */
export function ContentProtectionShield() {
  const [isBlackoutActive, setIsBlackoutActive] = useState(false);

  useEffect(() => {
    // -------------------------------------------------------------------------
    // 1. Prevent Right-Click Context Menu
    // -------------------------------------------------------------------------
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // -------------------------------------------------------------------------
    // 2. Prevent Dragging (Images, Links, Text)
    // -------------------------------------------------------------------------
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // -------------------------------------------------------------------------
    // 3. Prevent Text Selection
    // -------------------------------------------------------------------------
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // -------------------------------------------------------------------------
    // 4. Prevent Copy & Cut Actions
    // -------------------------------------------------------------------------
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', '');
      }
      return false;
    };

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', '');
      }
      return false;
    };

    // -------------------------------------------------------------------------
    // 5. Anti-Screenshot Key Interception & Shortcuts Blocking
    // -------------------------------------------------------------------------
    const triggerBlackout = (durationMs = 1200) => {
      setIsBlackoutActive(true);
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('').catch(() => {});
        }
      } catch {
        // clipboard write fallback
      }
      setTimeout(() => {
        if (document.hasFocus()) {
          setIsBlackoutActive(false);
        }
      }, durationMs);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const key = e.key ? e.key.toLowerCase() : '';
      const keyCode = e.keyCode || e.which;

      // PrintScreen Key (code 44 or 'PrintScreen')
      if (key === 'printscreen' || keyCode === 44 || e.code === 'PrintScreen') {
        e.preventDefault();
        triggerBlackout(2000);
        return false;
      }

      // Windows Snipping Tool (Win + Shift + S) or Mac Screenshots (Cmd + Shift + 3 / 4 / 5)
      if (e.shiftKey && (isCtrlOrCmd || e.metaKey)) {
        if (key === 's' || key === '3' || key === '4' || key === '5' || keyCode === 83 || (keyCode >= 51 && keyCode <= 53)) {
          e.preventDefault();
          triggerBlackout(2500);
          return false;
        }
      }

      // Block Copy (Ctrl/Cmd + C)
      if (isCtrlOrCmd && (key === 'c' || keyCode === 67)) {
        e.preventDefault();
        return false;
      }

      // Block Cut (Ctrl/Cmd + X)
      if (isCtrlOrCmd && (key === 'x' || keyCode === 88)) {
        e.preventDefault();
        return false;
      }

      // Block Select All (Ctrl/Cmd + A)
      if (isCtrlOrCmd && (key === 'a' || keyCode === 65)) {
        e.preventDefault();
        return false;
      }

      // Block Save Page (Ctrl/Cmd + S)
      if (isCtrlOrCmd && (key === 's' || keyCode === 83)) {
        e.preventDefault();
        return false;
      }

      // Block Print Page (Ctrl/Cmd + P)
      if (isCtrlOrCmd && (key === 'p' || keyCode === 80)) {
        e.preventDefault();
        triggerBlackout(2000);
        return false;
      }

      // Block View Source (Ctrl/Cmd + U)
      if (isCtrlOrCmd && (key === 'u' || keyCode === 85)) {
        e.preventDefault();
        return false;
      }

      // Block DevTools (F12, Ctrl/Cmd + Shift + I/J/C)
      if (keyCode === 123 || (isCtrlOrCmd && e.shiftKey && (key === 'i' || key === 'j' || key === 'c'))) {
        e.preventDefault();
        return false;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key ? e.key.toLowerCase() : '';
      if (key === 'printscreen' || e.keyCode === 44 || e.code === 'PrintScreen') {
        triggerBlackout(2000);
      }
    };

    // -------------------------------------------------------------------------
    // 6. Focus Loss / Window Blur & Visibility Obfuscation
    // When a screenshot tool, screen recorder, or external app activates over the window,
    // the window loses focus (blur / visibilitychange), triggering immediate blackout.
    // -------------------------------------------------------------------------
    const handleBlur = () => {
      setIsBlackoutActive(true);
    };

    const handleFocus = () => {
      setIsBlackoutActive(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsBlackoutActive(true);
      } else {
        setIsBlackoutActive(false);
      }
    };

    // Attach all event listeners
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('selectstart', handleSelectStart, true);
    document.addEventListener('copy', handleCopy, true);
    document.addEventListener('cut', handleCut, true);
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
      document.removeEventListener('copy', handleCopy, true);
      document.removeEventListener('cut', handleCut, true);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* Pitch-Black Screen Obfuscation Shield */}
      <div
        id="screenshot-protection-blackout-shield"
        aria-hidden="true"
        className={`fixed inset-0 z-[99999999] bg-black transition-opacity duration-75 pointer-events-none ${
          isBlackoutActive ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundColor: '#000000',
        }}
      />
    </>
  );
}
