import IDependenciesCollector from "../../scripts/collector/IDependenciesCollector";
import {IProjection} from "../../scripts/projections/IProjection";

class MockDependenciesCollector implements IDependenciesCollector {
    getDependenciesFor(projection: IProjection<any>): string[] {
        return null;
    }
}

export default MockDependenciesCollector