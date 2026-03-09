import { AfterViewInit, DestroyRef, Directive, ElementRef, inject, input, output } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { debounceTime, distinctUntilChanged, fromEvent, map } from "rxjs";


@Directive({
    selector: '[debounceInput]'
})

export class DebounceInputDirective implements AfterViewInit {
    private elementRef = inject(ElementRef<HTMLInputElement>);
    private destroyRef = inject(DestroyRef);
    debounceTimeValue = input<number>(1000);
    searchValue = output<string>();

    public get value(): string {
        return this.elementRef.nativeElement.value;
    };

    ngAfterViewInit(): void {
        fromEvent(this.elementRef.nativeElement, 'input').pipe(
            map(() => this.elementRef.nativeElement.value),
            debounceTime(this.debounceTimeValue()),
            distinctUntilChanged(),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((value) => {
            this.searchValue.emit(value);
        })
    }
}