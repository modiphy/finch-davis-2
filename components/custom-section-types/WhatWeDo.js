import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import uniqid from "uniqid";

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mt-6 text-lg leading-8 text-gray-600">{children}</p>
    ),
  },
};

const customItemOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <dd className="mt-2 text-base leading-7 text-gray-600">{children}</dd>
    ),
  },
};

export default function WhatWeDo({
  title,
  unformattedBody,
  customContentCollection,
}) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          {title && (
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h2>
          )}
          {documentToReactComponents(unformattedBody, options)}
        </div>
        {customContentCollection && (
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {customContentCollection.map((customContentItem) => (
                <div
                  key={`${customContentItem?.sys?.id}${uniqid()}`}
                  className="relative pl-16"
                >
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-sm bg-primary-600">
                      {customContentItem?.fields?.iconSvg && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: customContentItem?.fields?.iconSvg,
                          }}
                        />
                      )}
                      <div className="absolute -right-1.5 -top-1.5 h-10 w-10 border-r-2 border-t-2 border-primary-300"></div>
                    </div>
                    {customContentItem?.fields?.title}
                  </dt>
                  {documentToReactComponents(
                    customContentItem?.fields?.body,
                    customItemOptions
                  )}
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}