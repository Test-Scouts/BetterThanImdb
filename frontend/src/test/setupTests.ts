import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";

// react-router relies on TextEncoder, which jsdom does not provide
Object.assign(globalThis, { TextEncoder, TextDecoder });
