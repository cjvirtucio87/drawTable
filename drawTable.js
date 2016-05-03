//Program to draw a table.
//Based on the example in eloquent javascript.

'use strict';



//Cell object constructor.
function TextCell (text) {
	this.text = text.split('\n');
}

//minHeight is the length of the array of lines in the text property. 
TextCell.prototype.minHeight = function () {
	return this.text.length;
}

//minWidth is the greatest length among the line lengths in the cell.
TextCell.prototype.minWidth = function () {
	var lineLengths = this.text.map(function(line) {
		return line.length;
	});
	return getMaxOfArray(lineLengths);
}

//Padding each line in the cell.
function padLine (line,padding) {
	for (var i = 0; i < padding; i++) {
		line += " ";
	}
	return line;
}

//Draw the cell with the lines having been padded.
//Need to pass dimensions of the ROW, not the cell.
TextCell.prototype.draw = function (width,height) {
	var result = [];
	for (var i = 0; i < height; i++) {
		var line = this.text[i];
		var padding = (width - line.length);
		result.push(padLine(line,padding));
	}
	return result;
}

//Underlined cell.
function UnderlinedCell (inner) {
	this.inner = inner;
}

UnderlinedCell.prototype.minHeight = function () {
	return this.inner.minHeight + 1;
}

UnderlinedCell.prototype.minWidth = function () {
	return this.inner.minWidth;
}

UnderlinedCell.prototype.draw = function () {
	var innerWidth = this.minWidth;
	var innerHeight = this.minHeight;
	var underlined = multiplyString("-",innerWidth);
	return this.inner.draw(innerWidth,innerHeight).concat(underlined);
}

//Dimensions
//Height per row.
function rowHeights (rows) {
	var cellHeightsFlattened = rows.map(function(row) {
		var cellHeights = row.map(function(cell) {
			return cell.minHeight();
		});
		return getMaxOfArray(cellHeights);
	});
	return cellHeightsFlattened;
}

//Width per column.
function colWidths (rows) {
	var widthsAtLineNos = rows[0].map(function(_,i) {
		var cellWidths = rows.map(function(row) {
			return row[i].minWidth();
		});
		return getMaxOfArray(cellWidths);
	});
	return widthsAtLineNos;
}

//Utilities
function multiplyString (string,times) {
	var output = "";
	for (var i = 0; i < times; i++) {
		output += string;
	}
	return output;
}

function getMaxOfArray(array) {
	return Math.max.apply(null,array);
}


//App.
//Convert a string to a cell object.
function stringToCell (string) {
	var cell = new TextCell(string);
	return cell;
}

//Make cells within each row of the rows array.
function makeCells (rows) {
	return rows.map(function(row) {
		return row.map(stringToCell);
	});
}

//Draw a line using the line at index lineNo for each block.
function drawLine (blocks,lineNo) {
	return blocks.map(function(block) {
		return block[lineNo];
	}).join(" ");
} 

//Draw rows using the rows array containing cells.
function cellsDrawRows (rowsWithCells,widths,heights) {
	function drawRow (row, rowNum) {
		var blocks = row.map(function(cell,colNum) {
			return cell.draw(widths[colNum],heights[rowNum]);
		});

		return blocks[0].map(function(_,lineNo) {
			return drawLine(blocks,lineNo);
		});
	}

	return rowsWithCells.map(drawRow).join('\n');
}

function drawTable (data) {
	var rowsWithCells = makeCells(data);
	var widths = colWidths(rowsWithCells);
	var heights = rowHeights(rowsWithCells);
	
	return cellsDrawRows(rowsWithCells,widths,heights);
}

var myData = [["name", "age", "gender"],["CJ", "29", "male"], ["Jewel", "27", "female"]];

console.log(drawTable(myData));