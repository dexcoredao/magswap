import * as React from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { Link, useParams, useSearchParams } from "@remix-run/react";
import cn from "clsx";
import { Button } from "~/components/Button";
import { Switch } from "@headlessui/react";

const tabs = [
  { name: "Liquidity", query: "liquidity" },
  { name: "Stake", query: "stake" },
  { name: "Rewards", query: "rewards" },
] as const;

const TokenInput = ({
  tokenName,
  className,
}: {
  tokenName: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <label htmlFor="balance" className="sr-only">
        Balance
      </label>
      <div className="relative focus-within:border-red-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center space-x-2 pl-3 pb-4">
          <img
            src="https://via.placeholder.com/400"
            alt="placeholder"
            className="z-10 h-4 w-4 rounded-full ring-1"
          />
          <span className="block font-semibold text-white sm:text-sm">
            {tokenName}
          </span>
        </div>
        <input
          type="text"
          name="balance"
          id="balance"
          dir="rtl"
          className="block w-full rounded-md border-0 bg-gray-900 pl-7 pb-6 focus:outline-none focus:ring-2 focus:ring-red-600 sm:text-lg lg:text-2xl"
          placeholder="0.00"
        />
        <div className="pointer-events-none absolute left-0 bottom-2 flex flex-col items-end pl-3">
          <span className="text-xs text-gray-500">Balance: 123123</span>
        </div>
        <div className="pointer-events-none absolute bottom-2 right-0 flex flex-col items-end pr-3">
          <span className="text-xs text-gray-500">~ $123.45</span>
        </div>
      </div>
    </div>
  );
};

export default function Manage() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const selectedTab =
    tabs.find(({ query }) => query === searchParams.get("tab")) ?? tabs[0];

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-700">
        <nav className="-mb-px flex" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = tab.name === selectedTab.name;
            return (
              <Link
                key={tab.name}
                to={`/pools/${params.poolId}/manage?tab=${tab.query}`}
                className={cn(
                  isActive
                    ? "border-red-500 bg-gray-500/20 text-white"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "flex-1 whitespace-nowrap border-t-2 py-3 px-4 text-center text-xs font-medium sm:flex-none sm:py-4 sm:px-8 sm:text-left sm:text-sm"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>
      {(() => {
        switch (selectedTab.query) {
          case "liquidity":
            return <Liquidity />;
          case "stake":
            return <div>Stake</div>;
          case "rewards":
            return <div>Rewards</div>;
        }
      })()}
    </div>
  );
}

const Liquidity = () => {
  const [isAddLiquidity, setIsAddLiquidity] = React.useState(false);

  return (
    <div className="flex flex-1 items-center justify-center p-6 lg:p-8">
      <div className="flex max-w-xl flex-1 flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <span
            className={cn(
              isAddLiquidity && "text-gray-500",
              "text-[0.6rem] font-bold uppercase sm:text-base"
            )}
          >
            Remove Liquidity
          </span>
          <Switch
            checked={isAddLiquidity}
            onChange={setIsAddLiquidity}
            className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full ring-offset-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <span className="sr-only">
              {isAddLiquidity ? "Remove Liquidity" : "Add Liquidity"}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute h-full w-full rounded-md bg-gray-800"
            />
            <span
              aria-hidden="true"
              className={cn(
                isAddLiquidity ? "bg-[#E5003E]" : "bg-gray-200",
                "pointer-events-none absolute mx-auto h-2.5 w-8 rounded-full transition-colors duration-200 ease-in-out"
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                isAddLiquidity ? "translate-x-5" : "translate-x-0",
                "pointer-events-none absolute left-0 inline-block h-4 w-4 transform rounded-full border border-[#FF4E7E] bg-[#FF4E7E] shadow ring-0 transition-transform duration-200 ease-in-out"
              )}
            />
          </Switch>
          <span
            className={cn(
              !isAddLiquidity && "text-gray-500",
              "text-[0.6rem] font-bold uppercase sm:text-base"
            )}
          >
            Add Liquidity
          </span>
        </div>
        {isAddLiquidity ? (
          <div className="space-y-4">
            <TokenInput tokenName="MAGIC" />
            <div className="flex justify-center">
              <PlusIcon className="h-4 w-4 text-gray-400" />
            </div>
            <TokenInput tokenName="WETH" />
            <div className="space-y-2 rounded-md bg-gray-900 p-4">
              <p className="text-xs text-gray-600 sm:text-base">
                You'll receive (at least):
              </p>
              <p className="text-sm font-medium sm:text-lg">≈ 0.55 SLP</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <TokenInput tokenName="SLP" />
            <div className="space-y-2 rounded-md bg-gray-900 p-4">
              <p className="text-xs text-gray-600 sm:text-base">
                You'll receive (at least):
              </p>
              <div className="flex items-center justify-between">
                <span className="font-medium">0.0012 MAGIC</span>
                <span className="text-gray-200">≈ $0.09</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">0.0012 WETH</span>
                <span className="text-gray-200">≈ $0.09</span>
              </div>
            </div>
          </div>
        )}
        <Button>{isAddLiquidity ? "Add" : "Remove"} Liquidity</Button>
      </div>
    </div>
  );
};