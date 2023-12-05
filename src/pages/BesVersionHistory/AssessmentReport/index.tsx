import * as React from "react";

import Card from "@mui/material/Card";

import { Divider, Grid, Typography } from "@mui/material";
import { fetchJsonReport } from "../../../utils/fatch_json_report";
import { Link } from "react-router-dom";
import { assessment_datastore } from "../../../dataStore";
import MKBox from "../../../components/MKBox";
import MKTypography from "../../../components/MKTypography";
import {
  assessment_path,
  assessment_report
} from "../../../utils/assessmentReport";

const dividerDiv = (index: number) => {
  if (index !== 0) return <Divider sx={{ my: 1.5 }} />;
};

export const verifyLink = async (link: any, setLinkStatus: any) => {
  try {
    const response = await fetchJsonReport(link);
    try {
      let data = JSON.parse(response);
      setLinkStatus(data);
    } catch (err) {
      setLinkStatus({});
    }
  } catch (error) {
    setLinkStatus({});
  }
};

const CheckLink = ({ version, name, report }: any) => {
  const [linkStatus, setLinkStatus]: any = React.useState({});

  React.useEffect(() => {
    if (version.trim()) {
      let link: string = `${assessment_datastore}/${name}/${version}/${assessment_path[report]}/${name}-${version}-${assessment_report[report]}-report.json`;
      verifyLink(link, setLinkStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);
  let linkStatusLength: number = Object.values(linkStatus).length;
  if (report === "Criticality Score" && linkStatusLength !== 0)
    return (
      <Typography variant="subtitle1" color="inherit">
        {linkStatus.criticality_score}
      </Typography>
    );
  const pathName: string = `/BeSLighthouse/bes_assessment_report/:${name}/:${version}/:${report}`;
  const myObject = { pathname: pathName, state: linkStatus } as {
    pathname: string;
  };
  if (report === "ScoreCard" && linkStatusLength !== 0) {
    return <Link to={myObject}>{linkStatus.score}</Link>;
    // href={`/BeSLighthouse/bes_version_history/${version}/${name}`}
  }
  if (report === "Vulnerabilities" && linkStatusLength !== 0) {
    return <Link to={myObject}>{linkStatus.score}</Link>;
    // href={`/BeSLighthouse/bes_version_history/${version}/${name}`}
  }
  if (report === "License Compliance" && linkStatusLength !== 0) {
    return <Link to={myObject}>{linkStatus.score}</Link>;
    // href={`/BeSLighthouse/bes_version_history/${version}/${name}`}
  }
  if (report === "Dependencies" && linkStatusLength !== 0) {
    return <Link to={myObject}>{linkStatus.score}</Link>;
    // href={`/BeSLighthouse/bes_version_history/${version}/${name}`}
  }
  if (linkStatusLength !== 0) {
    return <Link to={myObject}>{linkStatus.score}</Link>;
  }
  return (
    <Typography variant="subtitle1" color="inherit">
      --
    </Typography>
  );
};

function AssessmentReport({ title, name, version, ...other }: any) {
  const report: string[] = [
    "ScoreCard",
    "Criticality Score",
    "Vulnerabilities",
    "License Compliance",
    "Dependencies"
  ];
  return (
    
    <Card sx={{ height: "100%" }} >
      <Grid container p={3}>
        
        {report.map((value, index) => {
            return (
              <>
              <MKBox  color="white" p={3.5} borderRadius="lg">
              
              <Grid p={3} style={{backgroundColor: "red", borderRadius: 10}} >
                  
                    <Grid container alignItems="center" color="white" justifyContent="center">
                      <Grid item justifyContent="center">
                        <Typography variant="h6" color="black">
                          {value}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid item>
                        <Grid container alignItems="center" color="white">
                          <Grid item>
                            <CheckLink version={version} name={name} report={value} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  
                </Grid>
              
              </MKBox>
              </>
            );
          })}
        
        </Grid>
    </Card>
  );
}

export default AssessmentReport;
