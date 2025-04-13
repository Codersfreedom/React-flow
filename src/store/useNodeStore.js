import { create } from "zustand";

const useNodeStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeId: 1,
  nodeType: "default",
  setNodes: (newNodes) => set(() => ({ nodes: newNodes })),
  setEdges: (newEdges) => set(() => ({ edges: newEdges })),
  createNode: (type, data = "", mediaType) => {
    const { nodeId } = get();

    const newNode = {
      id: nodeId.toString(),
      type: type,
      data: { src: data, mediaType },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    };
    set((state) => ({
      nodes: [...state.nodes, newNode],
      nodeId: state.nodeId + 1,
    }));

    return get().nodeId - 1;
  },
  updateNodeData: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id == id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    })),
}));

export default useNodeStore;
