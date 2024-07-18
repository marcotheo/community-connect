import type { DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";

import Menu, {
  DropDownMenuItem,
  DropDownMenuLabel,
  DropDownSeparator,
} from "~/components/dropdownmenu/dropdownmenu";
import Dialog, { DialogTrigger } from "~/components/dialog/dialog";
import Heading from "~/components/heading/heading";
import Button from "~/components/button/button";
import Input from "~/components/input/input";

export default component$(() => {
  return (
    <div>
      <br />
      <div class="flex flex-col gap-3">
        <div class="w-full mx-auto min-h-[10rem] bg-surface rounded-sm shadow-md p-3">
          <div class="flex flex-col gap-5">
            <div>
              <div class="flex gap-2 items-center pb-3">
                <Heading>Headings</Heading>
                <div class="w-full h-[1px] bg-gray-500" />
              </div>
              <div class="flex flex-wrap md:grid-cols-6 gap-5 items-end">
                <Heading size="xxl">XXL</Heading>
                <Heading size="xl">XL</Heading>
                <Heading size="lg">Large</Heading>
                <Heading size="md">Medium</Heading>
                <Heading size="sm">Small</Heading>
                <Heading size="xs">XS</Heading>
              </div>
            </div>

            <div>
              <div class="flex gap-2 items-center pb-3">
                <Heading>Buttons</Heading>
                <div class="w-full h-[1px] bg-gray-500" />
              </div>
              <div class="flex flex-col md:flex-row gap-5">
                <Button>Default</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </div>

            <div class="w-full">
              <div class="flex gap-2 items-center pb-3">
                <Heading>Inputs</Heading>
                <div class="w-full h-[1px] bg-gray-500" />
              </div>
              <div class="flex flex-col w-full md:w-96 md:flex-row md:gap-5">
                <Input label="First Name" />
                <Input label="First Name" variant="underline" />
              </div>
            </div>

            <div>
              <div class="flex gap-2 items-center pb-3">
                <Heading>Menus</Heading>
                <div class="w-full h-[1px] bg-gray-500" />
              </div>

              <div class="flex justify-between gap-5">
                <Menu title="Menu">
                  <div q:slot="label">
                    <DropDownMenuLabel>Sample Menu</DropDownMenuLabel>
                  </div>
                  <DropDownMenuItem>Item 1</DropDownMenuItem>
                  <DropDownMenuItem>Item 2</DropDownMenuItem>
                  <DropDownMenuItem>Item 3</DropDownMenuItem>
                  <DropDownSeparator />
                  <DropDownMenuItem>Item 1</DropDownMenuItem>
                  <DropDownMenuItem>Item 2</DropDownMenuItem>
                  <DropDownMenuItem>Item 3</DropDownMenuItem>
                </Menu>

                <Menu title="Menu">
                  <DropDownMenuLabel q:slot="label">
                    Sample Menu
                  </DropDownMenuLabel>
                  <DropDownMenuItem>Item 1</DropDownMenuItem>
                  <DropDownMenuItem>Item 2</DropDownMenuItem>
                  <DropDownMenuItem>Item 3</DropDownMenuItem>
                  <DropDownSeparator />
                  <DropDownMenuItem>Item 1</DropDownMenuItem>
                  <DropDownMenuItem>Item 2</DropDownMenuItem>
                  <DropDownMenuItem>Item 3</DropDownMenuItem>
                </Menu>
              </div>
            </div>

            <div>
              <div class="flex gap-2 items-center pb-3">
                <Heading>Dialog</Heading>
                <div class="w-full h-[1px] bg-gray-500" />
              </div>

              <div class="flex justify-between gap-5">
                <Dialog>
                  <DialogTrigger q:slot="trigger">Open1</DialogTrigger>
                  <div>asdasdasd</div>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
