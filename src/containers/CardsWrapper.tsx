import {IWorkplace} from "store/workplace/WorkplaceReducer";
import {IWorkbook} from "store/workbook/WorkbookReducer";
import Loading from "components/Loading";
import Card from "components/Card";
import * as React from "react";
import {Map} from "immutable";

const throttle = require("lodash.throttle");

import * as styles from "assets/css/cardsWrapper.css";

interface ICardsWrapperProps {
  entities: Map<string, IWorkbook | IWorkplace>;
  attemptGetEntities: (params: any) => void;
  getDetails: (entity: any) => Array<{
    tooltip: string;
    icon: string;
    value: any;
  }>;
  getTitle?: (entity: any) => string;
  getLink?: (entity: any) => string;
  showActions: boolean;
  isLoading: boolean;
  searchForm?: any;
  pagination: any;
  children: any;
  params?: any;
}

interface ICardsWrapperState {
  scrollY: number;
  offset: number;
}

export default class CardsWrapper extends React.Component<ICardsWrapperProps, ICardsWrapperState> {
  constructor(props: ICardsWrapperProps) {
    super(props);

    this.handleThrottledScroll = throttle(this.handleScroll, 1000);

    this.state = {
      scrollY: 0,
      offset: 0,
    };
  }

  handleThrottledScroll: any;

  handleScroll = () => {
    const { pagination, entities, attemptGetEntities, params } = this.props;
    const { scrollY, offset } = this.state;

    if (pagination.get("count") > entities.size && window.scrollY - scrollY >= 400) {
      this.setState({ scrollY: window.scrollY, offset: offset + 1 }, () => {
        attemptGetEntities({ ...params, offset: offset + 1 });
      });
    }
  };

  componentDidMount(): void {
    const { attemptGetEntities, params } = this.props;

    attemptGetEntities(params);
    document.addEventListener("scroll", this.handleThrottledScroll, true);
  }

  shouldComponentUpdate(nextProps: ICardsWrapperProps, nextState: ICardsWrapperState): boolean {
    const { pagination, entities, isLoading } = this.props;
    const { offset, scrollY } = this.state;

    if (!pagination.equals(nextProps.pagination)) {
      return true;
    }

    if (isLoading !== nextProps.isLoading) {
      return true;
    }

    if (scrollY !== nextState.scrollY) {
      return true;
    }

    if (offset !== nextState.offset) {
      return true;
    }

    return !entities.equals(nextProps.entities);
  }

  componentWillUnmount(): void {
    document.removeEventListener("scroll", this.handleThrottledScroll, true);
  }

  render(): JSX.Element {
    const {
      getTitle = () => '',
      getLink = () => '',
      getDetails,
      entities,
      children,
      showActions,
      isLoading,
    } = this.props;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div className={styles.cardsWrapper}>
        {entities.valueSeq().map(entity => (
          <Card
            details={getDetails(entity)}
            title={getTitle(entity)}
            key={entity.get("id")}
            link={getLink(entity)}
          >
            {showActions && children(entity.get("id"))}
          </Card>
        ))}
      </div>
    );
  }
}
