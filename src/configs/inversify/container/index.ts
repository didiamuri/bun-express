import {Container} from 'inversify';
import {buildProviderModule} from 'inversify-binding-decorators';
import {ErrorHandler} from "../../../middlewares/error-handler.ts";

const container = new Container();

container.bind<ErrorHandler>("ErrorHandler").to(ErrorHandler);

container.load(buildProviderModule());

export {
    container
};