import { Hct, hexFromArgb } from "@material/material-color-utilities";

figma.showUI(__html__, { themeColors: true, height: 500 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-color") {
    // Get the number of selected elements
    let selectedElements = figma.currentPage.selection.length;

    // Display error messages on invalid sleection
    if (selectedElements === 0) {
      figma.closePlugin("No element selected!");
      return;
    }

    if (selectedElements > 1) {
      figma.closePlugin("Please select a single element!");
      return;
    }

    // Fill the current selection
    const node: SceneNode = figma.currentPage.selection[0];
    if (node.type === "RECTANGLE") {
      const color = Hct.from(
        Number(msg.huevalue),
        Number(msg.chromavalue),
        Number(msg.tonevalue)
      );
      const hex = hexFromArgb(color.toInt());

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      let r = 0;
      let g = 0;
      let b = 0;
      if (result) {
        const color = {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        };
        r = (color.r)/255;
        g = (color.g)/255;
        b = (color.b)/255;
      } else {
        figma.closePlugin("Invalid color string");
      }
      console.log({ r,g,b });

      const rect = node;
      rect.fills = [{ type: "SOLID", color: { r, g, b } }];
    }
  }

  figma.closePlugin();
};
