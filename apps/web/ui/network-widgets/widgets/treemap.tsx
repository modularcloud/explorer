"use client";
import React, { useRef, useEffect, useMemo } from "react";
import * as d3 from "d3";
import { Card } from "~/ui/card";
import { useRouter } from "next/navigation";
import { cn } from "~/ui/shadcn/utils";

interface Props {
  className?: string;
  data: Record<string, number>;
}

export function Treemap(props: Props) {
  const router = useRouter();
  const labelSkipSize = 11;
  function formatBytes(bytes: number | undefined) {
    if (typeof bytes === "number") {
      const kb = bytes / 1024;
      if (kb < 1) {
        return bytes + "bytes";
      } else if (kb < 1024) {
        return kb.toFixed(2) + "kb";
      } else {
        return (kb / 1024).toFixed(2) + " Mb";
      }
    }
  }
  const svgRef = useRef(null);
  const treemapData = useMemo(() => {
    const colors = ["#daccff8f", "#d2d4fe8f", "#D6E1FF8F"];
    const data = {
      name: "All Namespaces",
      children: Object.entries(props.data).map(([name, size]) => ({
        name,
        value: size,
        tileColor: colors[Math.floor(Math.random() * colors.length)],
      })),
    };

    const root = d3.hierarchy(data).sum((d: any) => d.value);
    const treemapRoot = d3.treemap().size([450, 500]).padding(4)(root);

    return treemapRoot.leaves();
  }, [props.data]);
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const leaf = svg
      .selectAll("g")
      .data(treemapData)
      .join("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`)
      .attr("display", "relative");
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("padding", "5px")
      .style("border", "1px solid black")
      .style("border-radius", "5px")
      .style("opacity", 0); // start off as hidden

    leaf
      .append("rect")
      .filter((d) => d.x1 - d.x0 > labelSkipSize && d.y1 - d.y0 > labelSkipSize)
      .attr("id", (d: any) => {
        d.leafUid = "leaf";
        return d.leafUid;
      })

      .attr("fill", (d: any) => {
        return d.data.tileColor;
      })
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("rx", 5)
      .on("mouseover", function (event, d: any) {
        d3.select(this).attr("data-original-color");
        d3.select(this)
          .style("fill", "lightsteelblue")
          .style("cursor", "pointer");
        tooltip
          .html("ID: " + d.data.name + "<br/>Value: " + d.value)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 15 + "px")
          .style("opacity", 1);
      })
      .on("mouseout", function () {
        d3.select(this).style(
          "fill",
          d3.select(this).attr("data-original-color"),
        );
        tooltip.style("opacity", 0); // Hide tooltip
      })
      .on("click", (event, d: any) => {
        console.log(d);
        router.push(`/namespace/${d.data.name}`);
      })
      .attr("ry", 5);

    leaf
      .append("text")
      .filter((d) => d.x1 - d.x0 > labelSkipSize && d.y1 - d.y0 > labelSkipSize)
      .attr("fill", (d: any) => {
        if (d.data.tileColor == "#daccff8f") {
          return "#3D1E95";
        } else if (d.data.tileColor == "#d2d4fe8f") {
          return "#213898";
        } else {
          return "#3A68A6";
        }
      })
      .text((d) => formatBytes(d.value) || "")
      .attr("transform", (d) => {
        const width = d.x1 - d.x0;
        const height = d.y1 - d.y0;
        if (height > width) {
          // 270-degree rotation and adjust the y-coordinate (which is now x after rotation)
          return `rotate(270 ${width / 2} ${height / 2}) translate(0, ${
            -width / 2 + height / 2
          })`;
        } else {
          return "";
        }
      })
      .attr("x", (d) => (d.x1 - d.x0) / 2) // half the width of the rectangle
      .attr("y", (d) => {
        const width = d.x1 - d.x0;
        const height = d.y1 - d.y0;
        return height > width ? width / 2 + 5 : height / 2 + 5;
      })
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .attr("class", "font-sans")
      .attr("display", "relative")
      .attr("text-align", "center")
      .attr("font-weight", "500");
  }, [treemapData]);

  return (
    <Card className={cn("flex flex-col p-0  ", props.className)}>
      <header className=" flex items-center  border-b border-mid-dark-100 p-3 justify-between text  ">
        <p className="text-lg">Data Usage</p>
        <span className="text-muted font-normal">Last 10 Days</span>
      </header>
      <div className="h-full">
        <svg ref={svgRef} width="100%" height="500" />
      </div>
    </Card>
  );
}
export default Treemap;
