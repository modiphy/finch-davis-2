import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Link from "next/link";

export default function ContactInformationItem({ title, body, url }) {
  return (
    <div>
      <p className="text-xl font-medium uppercase tracking-wide text-primary-400">
        {title}
      </p>
      {url ? (
        <Link
          href={url}
          className="group mt-3 block cursor-pointer text-lg text-gray-300"
        >
          {documentToReactComponents(body, options)}
        </Link>
      ) : (
        <div className="mt-3 text-lg text-gray-300">
          {documentToReactComponents(body, options)}
        </div>
      )}
    </div>
  );
}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      return (
        <Link
          href={`/${node?.data?.target?.fields?.page?.fields?.slug}`}
          className="button inline-flex w-full justify-center rounded-md border-2 border-transparent bg-primary-600 px-6 py-2 text-white hover:bg-primary-500 focus:ring-primary-500"
        >
          {node?.data?.target?.fields?.text}
        </Link>
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className="mt-1 text-lg group-hover:underline">{children}</p>;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <span className="text-theme-body mt-1 text-base leading-tight">
          <Link
            href={node?.data?.uri}
            target="_blank"
            className="hover:text-white hover:underline"
          >
            {children}
          </Link>
        </span>
      );
    },
  },
};
