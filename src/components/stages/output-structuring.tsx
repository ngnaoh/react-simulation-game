import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  CheckIcon,
  HelpCircleIcon,
  LightbulbIcon,
} from "lucide-react";
import { useMemo } from "react";
import { getCapitalRaised, getSharesBidFor, getStatus } from "@/lib/utils";
import { Button } from "../ui/button";
import { DrawerDialog } from "../drawer-dialog";
import { useSimulation } from "@/contexts/simulation-provider";
export default function OutputStructuring() {
  const { simulation } = useSimulation();

  const data = useMemo(() => {
    const formStructuringData = simulation?.data.fields.companies;
    if (!formStructuringData) return { summary: [], subscription: [] };
    const sharesBidForComp1 = getSharesBidFor(formStructuringData, "company1");
    const sharesBidForComp2 = getSharesBidFor(formStructuringData, "company2");
    const sharesBidForComp3 = getSharesBidFor(formStructuringData, "company3");

    return {
      summary: [
        {
          company: "Company 1",
          sharesBidFor: sharesBidForComp1,
          capitalRaised: getCapitalRaised(
            formStructuringData,
            sharesBidForComp1,
            "company1"
          ),
        },
        {
          company: "Company 2",
          sharesBidFor: sharesBidForComp2,
          capitalRaised: getCapitalRaised(
            formStructuringData,
            sharesBidForComp2,
            "company2"
          ),
        },
        {
          company: "Company 3",
          sharesBidFor: sharesBidForComp3,
          capitalRaised: getCapitalRaised(
            formStructuringData,
            sharesBidForComp3,
            "company3"
          ),
        },
      ],
      subscription: [
        {
          company: "Company 1",
          status: getStatus(formStructuringData, sharesBidForComp1, "company1"),
        },
        {
          company: "Company 2",
          status: getStatus(formStructuringData, sharesBidForComp2, "company2"),
        },
        {
          company: "Company 3",
          status: getStatus(formStructuringData, sharesBidForComp3, "company3"),
        },
      ],
    };
  }, [simulation?.data.fields]);

  const mostBidsCompany = useMemo(() => {
    return data.summary.reduce((prev, current) => {
      if (
        typeof prev.sharesBidFor === "number" &&
        typeof current.sharesBidFor === "number"
      ) {
        return prev.sharesBidFor > current.sharesBidFor ? prev : current;
      }
      return prev;
    }, data.summary[0]);
  }, [data.summary]);

  return (
    <div className="bg-background text-foreground flex items-center justify-center pt-8">
      <Card className="w-full max-w-4xl bg-card border-border shadow-lg">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="font-bold text-foreground text-center sm:text-left text-lg sm:text-3xl">
            Common Outputs Overview
          </CardTitle>
          <CardDescription className="text-muted-foreground text-center sm:text-left">
            Insights into company bids, capital raised, and subscription
            statuses.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted p-1 rounded-lg">
              <TabsTrigger
                value="summary"
                className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground">
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="subscription"
                className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground">
                Subscription
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="summary"
              className="mt-6 sm:w-full w-[60vw] mx-auto">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">
                Capital & Bids Summary
              </h3>
              <Table className="bg-muted rounded-md w-full overflow-auto">
                <TableHeader>
                  <TableRow className="border-b border-border px-4">
                    <TableHead className="text-muted-foreground pl-4">
                      Company
                    </TableHead>
                    <TableHead className="text-muted-foreground text-right">
                      Shares Bid For
                    </TableHead>
                    <TableHead className="text-muted-foreground text-right pr-4">
                      Capital Raised
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.summary.map((row) => (
                    <TableRow
                      key={row.company}
                      className="border-b border-border last:border-b-0 hover:bg-accent/50 h-10">
                      <TableCell className="font-medium text-foreground pl-4">
                        {row.company}
                      </TableCell>
                      <TableCell className="text-right text-foreground">
                        {row.sharesBidFor.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-foreground pr-4">
                        {typeof row.capitalRaised === "number" ? (
                          `$${row.capitalRaised.toLocaleString()}`
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-muted-foreground text-muted">
                            {row.capitalRaised}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="subscription" className="mt-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">
                Subscription Status
              </h3>
              <Table className="bg-muted rounded-md w-full overflow-auto">
                <TableHeader>
                  <TableRow className="border-b border-border">
                    <TableHead className="text-muted-foreground pl-4">
                      Company
                    </TableHead>
                    <TableHead className="text-muted-foreground text-center">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.subscription.map((row) => (
                    <TableRow
                      key={row.company}
                      className="border-b border-border last:border-b-0 hover:bg-accent/50 h-10">
                      <TableCell className="font-medium text-foreground pl-4">
                        {row.company}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={` 
                            w-18
                            ${
                              row.status === "Over"
                                ? "bg-emerald-500 text-emerald-950"
                                : ""
                            }
                            ${
                              row.status === "Under"
                                ? "bg-red-500 text-red-950"
                                : ""
                            }
                            ${
                              row.status === "Filled"
                                ? "bg-amber-500 text-amber-950"
                                : ""
                            }
                          `}>
                          {row.status}
                          {row.status === "Over" ? (
                            <ArrowUpRightIcon className="ml-1 h-3 w-3 inline" />
                          ) : row.status === "Filled" ? (
                            <CheckIcon className="ml-1 h-3 w-3 inline" />
                          ) : (
                            <ArrowDownRightIcon className="ml-1 h-3 w-3 inline" />
                          )}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>

          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Quick Insight
            </h3>
            <Card className="bg-muted border-border">
              <CardContent className="sm:p-4 p-2 flex items-center sm:flex-row flex-col gap-2 justify-between">
                <HelpCircleIcon className="h-5 w-5 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <p className="text-md text-foreground sm:text-left text-center">
                    Which company received most bids from investors?
                    <br />
                    <span className="text-sm text-muted-foreground">
                      Try to come up with your own
                    </span>
                  </p>
                </div>
                <DrawerDialog
                  title="Most Bids Company"
                  trigger={
                    <Button type="button" variant="outline" className="sm:ml-4">
                      View Answer
                    </Button>
                  }>
                  <div className="flex flex-col items-center gap-4 p-6">
                    <LightbulbIcon className="h-24 w-24" />
                    <p className="text-md text-foreground text-center">
                      <span className="font-bold text-foreground">
                        {mostBidsCompany.company}
                      </span>{" "}
                      received the most bids from investors with{" "}
                      <span className="font-bold text-foreground">
                        {mostBidsCompany.sharesBidFor.toLocaleString()}
                      </span>{" "}
                      shares bid for.
                    </p>
                  </div>
                </DrawerDialog>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
