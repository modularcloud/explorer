"use client";
import React, { useRef, useEffect, useMemo } from "react";
import * as d3 from "d3";
import { Card } from "~/ui/card";
import { useRouter } from "next/navigation";
import { cn } from "~/ui/shadcn/utils";

interface Props {
  className?: string;
  data: Record<string, number>;
  networkId: String;
}

export function Treemap(props: Props) {
  const router = useRouter();
  const labelSkipSize = 11;
  const formatBytes = (bytes: number | undefined) => {
    if (typeof bytes === "number") {
      const kb = bytes / 1024;
      if (kb < 1) {
        return bytes + "bytes";
      } else if (kb < 1024) {
        return kb.toFixed(1) + "Kb";
      } else {
        return (kb / 1024).toFixed(1) + " Mb";
      }
    }
  };
  const svgRef = useRef(null);

  const treemapData = useMemo(() => {
    const colors = ["#daccff8f", "#d2d4fe8f", "#D6E1FF8F"];

    const sortedData = Object.entries(props.data)
      .map(([name, size]) => ({ name, value: size }))
      .sort((a, b) => b.value - a.value);

    const data = {
      name: "All Namespaces",
      children: sortedData,
    };

    // A dummy treemap in D3.js is created to pre-calculate layouts, ensuring no gaps in the visualization when dynamically filtering values.
    const dummyRoot = d3.hierarchy(data).sum((d: any) => d.value);
    const dummyTreemapRoot = d3.treemap().size([450, 250]).padding(4)(
      dummyRoot,
    );

    const filteredChildren = data.children.filter((d: any) => {
      const node = dummyTreemapRoot
        .descendants()
        .find((n: any) => n.data.name === d.name);
      if (!node) return false;
      return (
        node.x1 - node.x0 > labelSkipSize && node.y1 - node.y0 > labelSkipSize
      );
    });
    const filteredData = {
      name: "All Namespaces",
      children: filteredChildren,
    };
    const segmentLength = Math.floor(filteredChildren.length / 3);

    const colorCategorizedData = filteredChildren
      .map((item, index) => {
        // Set tile  to 0, 1, or 2 based on whether index is in the first, second, or third segment of the array, respectively.
        const colorIndex =
          index < segmentLength
            ? 0
            : index < 2 * segmentLength ||
              (filteredChildren.length % 3 === 0 && index < 3 * segmentLength)
            ? 1
            : 2;
        console.log(colors[colorIndex]);

        return {
          ...item,
          tileColor: colors[colorIndex] || colors[colors.length - 1],
        };
      })
      .slice(0, 25);
    filteredData.children = colorCategorizedData;
    const root = d3.hierarchy(filteredData).sum((d: any) => d.value);
    const treemapRoot = d3.treemap().size([430, 300]).padding(4)(root);

    return treemapRoot
      .leaves()
      .filter(
        (d) => d.x1 - d.x0 > labelSkipSize && d.y1 - d.y0 > labelSkipSize,
      );
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
    let tooltip = d3.select("body").select(".tooltip") as d3.Selection<
      HTMLDivElement,
      unknown,
      HTMLElement,
      any
    >;

    if (tooltip.empty()) {
      tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("padding", "5px")
        .style("border-radius", "4px")
        .style("opacity", 0);
    }
    leaf
      .append("rect")
      .attr("stroke", (d: any) => {
        return d.data.tileColor;
      }) // Color of the border
      .attr("stroke-width", 1)
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
      .on("mousemove", function (event, d: any) {
        d3.select(this).attr("data-original-color");
        d3.select(this)
          .style("fill", "lightsteelblue")
          .style("cursor", "pointer");
        tooltip
          .html(function () {
            return `<div style="display: flex; align-items: center; justify-content: center;">
              <div style="width:20px; height:20px; background-color:${d.data.tileColor};"></div>
              <span style="margin-left: 5px;">ID: ${d.data.name} ${d.value}</span>
            </div>`;
          })
          .each(function () {
            const svgNode = svg.node() as Element | null;
            if (svgNode) {
              const treemapWidth = svgNode.getBoundingClientRect().width;
              const treemapCenter = treemapWidth / 2;
              const rectMidpoint = d.x0 + (d.x1 - d.x0) / 2;
              let tooltipWidth = this.offsetWidth;

              if (rectMidpoint > treemapCenter) {
                d3.select(this).style(
                  "left",
                  event.pageX - tooltipWidth - 10 + "px",
                );
              } else {
                d3.select(this).style("left", event.pageX + 10 + "px");
              }
            }
          })
          .style("top", event.pageY + 5 + "px")
          .on("mousemove", function (event) {
            const [mouseX, mouseY] = d3.pointer(event);
            const tooltipWidth = tooltip.node()?.offsetWidth || 200;
            const offset = 10;
            const tooltipX = mouseX - tooltipWidth - offset;
            const tooltipY = mouseY;
            tooltip
              .style("left", `${tooltipX}px`)
              .style("top", `${tooltipY}px`);
          })
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
        tooltip.style("opacity", 0);
        router.push(`/${props.networkId}/namespaces/${d.data.name}`);
      })
      .attr("ry", 5);

    leaf
      .append("text")
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
        //Text Rotation
        const width = d.x1 - d.x0;
        const height = d.y1 - d.y0;
        if (height > width) {
          return `rotate(270 ${width / 2} ${height / 2}) translate(0, ${
            -width / 2 + height / 2
          })`;
        } else {
          return "";
        }
      })
      .attr("x", (d) => (d.x1 - d.x0) / 2)
      .attr("y", (d) => {
        const width = d.x1 - d.x0;
        const height = d.y1 - d.y0;
        return height > width ? width / 2 + 5 : height / 2 + 5;
      })
      .attr("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("class", "font-sans")
      .attr("display", "relative")
      .attr("text-align", "center")
      .style("cursor", "pointer")
      .attr("text-align", "center")
      .attr("pointer-events", "none")
      .attr("padding", "2px")
      .attr("font-weight", "500");
  }, [props.networkId, router, treemapData]);

  return (
    <Card className={cn("flex flex-col p-0  ", props.className)}>
      <header className=" border-mid-dark-100 text  flex items-center justify-between border-b p-3">
        <p className="text-lg">Data Usage</p>
        <span className="text-muted font-normal">Last 10 Days</span>
      </header>
      <div className="h-full">
        <svg ref={svgRef} width="100%" height="310" className="py-1 pl-2" />
      </div>
    </Card>
  );
}
export default Treemap;
