const cqResizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const { target } = entry
    const { offsetWidth: targetWidth, offsetHeight: targetHeight } = target

    // Returns false or attribute value parsed as Array
    const minWidth =
      target.dataset.cqMinW && JSON.parse(`[${target.dataset.cqMinW}]`)
    const maxWidth =
      target.dataset.cqMaxW && JSON.parse(`[${target.dataset.cqMaxW}]`)
    const minHeight =
      target.dataset.cqMinH && JSON.parse(`[${target.dataset.cqMinH}]`)
    const maxHeight =
      target.dataset.cqMaxH && JSON.parse(`[${target.dataset.cqMaxH}]`)

    // min-width
    minWidth?.forEach((breakpoint) => {
      const attrName = `cq-min-w-${breakpoint}`
      if (targetWidth >= breakpoint && !target.hasAttribute(attrName)) {
        target.setAttribute(attrName, "")
      } else if (targetWidth < breakpoint) {
        target.removeAttribute(attrName)
      }
    })

    // max-width
    maxWidth?.forEach((breakpoint) => {
      const attrName = `cq-max-w-${breakpoint}`
      if (targetWidth <= breakpoint && !target.hasAttribute(attrName)) {
        target.setAttribute(attrName, "")
      } else if (targetWidth > breakpoint) {
        target.removeAttribute(attrName)
      }
    })

    // min-height
    minHeight?.forEach((breakpoint) => {
      const attrName = `cq-min-h-${breakpoint}`
      if (targetHeight >= breakpoint && !target.hasAttribute(attrName)) {
        target.setAttribute(attrName, "")
      } else if (targetHeight < breakpoint) {
        target.removeAttribute(attrName)
      }
    })

    // max-height
    maxHeight?.forEach((breakpoint) => {
      const attrName = `cq-max-h-${breakpoint}`
      if (targetHeight <= breakpoint && !target.hasAttribute(attrName)) {
        target.setAttribute(attrName, "")
      } else if (targetHeight > breakpoint) {
        target.removeAttribute(attrName)
      }
    })
  })
})

// Get all elements
const cqEls = Array.from(
  document.querySelectorAll(
    "[data-cq-min-w], [data-cq-max-w], [data-cq-min-h], [data-cq-max-h]"
  )
)

// Initiate
cqEls.forEach((el) => {
  cqResizeObserver.observe(el, { box: "border-box" })
})
